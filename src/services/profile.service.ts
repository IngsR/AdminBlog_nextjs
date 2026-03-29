import { ProfileRepository, Profile, NewProfile } from '@/repositories/profile.repository';
import { UserRepository } from '@/repositories/user.repository';

export class ProfileService {
  private repository: ProfileRepository;
  private userRepository: UserRepository;

  constructor() {
    this.repository = new ProfileRepository();
    this.userRepository = new UserRepository();
  }

  async getAllProfiles(): Promise<Profile[]> {
    return await this.repository.findAll();
  }

  async getProfileById(id: string): Promise<Profile | undefined> {
    const profile = await this.repository.findById(id);
    if (profile) return profile;

    // Fallback: Check if user exists but has no profile record yet
    const user = await this.userRepository.findById(id);
    if (!user) return undefined;

    // Lazy create profile from user data
    const newProfile: NewProfile = {
      id: user.id,
      name: user.fullName,
      bio: user.bio || '',
      avatar_url: user.avatarUrl || '',
    };
    
    const results = await this.repository.create(newProfile);
    return results[0];
  }

  async createProfile(data: NewProfile): Promise<Profile> {
    const existing = await this.repository.findById(data.id);
    if (existing) {
      throw new Error('Profile already exists for this user');
    }

    const result = await this.repository.create(data);
    return result[0];
  }

  async updateProfile(id: string, data: Partial<NewProfile>): Promise<Profile> {
    const result = await this.repository.update(id, data);
    if (!result.length) throw new Error('Profile not found');
    return result[0];
  }

  async deleteProfile(id: string): Promise<Profile> {
    const result = await this.repository.delete(id);
    if (!result.length) throw new Error('Profile not found');
    return result[0];
  }
}
