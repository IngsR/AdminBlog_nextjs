import { UserRepository, User, NewUser } from '@/repositories/user.repository';
import bcrypt from 'bcryptjs';
import { getIronSession, IronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionData, defaultSession } from '@/lib/session';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(data: Omit<NewUser, 'passwordHash'> & { password?: string }): Promise<User> {
    if (!data.password) {
      throw new Error('Password is required');
    }

    // Check if user already exists
    const existingUser = await this.userRepository.findByUsernameOrEmail(data.username);
    if (existingUser) {
      throw new Error('Username or email already exists');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    
    const newUser: NewUser = {
      username: data.username,
      email: data.email,
      fullName: data.fullName,
      bio: data.bio,
      avatarUrl: data.avatarUrl,
      passwordHash,
      role: 'admin',
    };

    const result = await this.userRepository.create(newUser);
    return result[0];
  }

  async login(username: string, password?: string): Promise<User> {
    if (!password) {
      throw new Error('Password is required');
    }

    const user = await this.userRepository.findByUsernameOrEmail(username);
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordMatch) {
      throw new Error('Invalid username or password');
    }

    return user;
  }

  async getSession(): Promise<IronSession<SessionData>> {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    if (!session.isLoggedIn) {
      Object.assign(session, defaultSession);
    }

    return session;
  }

  async createSession(user: User): Promise<void> {
    const session = await this.getSession();
    session.userId = user.id;
    session.isLoggedIn = true;
    session.username = user.username;
    session.role = user.role || 'admin';
    await session.save();
  }

  async logout(): Promise<void> {
    const session = await this.getSession();
    session.destroy();
  }
}
