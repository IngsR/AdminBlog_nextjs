import { NextResponse } from 'next/server';
import { ProfileService } from '@/services/profile.service';

const profileService = new ProfileService();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const profile = await profileService.getProfileById(id);
    if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    return NextResponse.json(profile);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const profile = await profileService.updateProfile(id, body);
    return NextResponse.json(profile);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
