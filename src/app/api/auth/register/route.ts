import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';

const authService = new AuthService();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password, fullName, bio } = body;

    if (!username || !email || !password || !fullName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const user = await authService.register({
      username,
      email,
      password,
      fullName,
      bio,
    });

    return NextResponse.json({ message: 'User registered successfully', userId: user.id }, { status: 201 });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
