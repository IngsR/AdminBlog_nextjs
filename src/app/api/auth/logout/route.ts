import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';

const authService = new AuthService();

export async function POST() {
  await authService.logout();
  return NextResponse.json({ success: true });
}
