import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';

const authService = new AuthService();

export async function GET() {
  try {
    const session = await authService.getSession();
    
    if (!session.isLoggedIn || !session.userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    return NextResponse.json({ 
      id: session.userId,
      username: session.username,
      role: session.role
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
