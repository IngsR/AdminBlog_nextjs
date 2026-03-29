import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';

const authService = new AuthService();

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const user = await authService.login(username, password);
    await authService.createSession(user);

    return NextResponse.json({ 
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
