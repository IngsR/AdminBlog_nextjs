import { NextResponse } from 'next/server';
import { ProfileService } from '@/services/profile.service';

const profileService = new ProfileService();

export async function GET() {
  try {
    const profiles = await profileService.getAllProfiles();
    return NextResponse.json(profiles);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, name, avatar_url, bio } = body;
    
    if (!id || !name) {
      return NextResponse.json({ error: 'id and name are required' }, { status: 400 });
    }

    const profile = await profileService.createProfile({
      id,
      name,
      avatar_url,
      bio
    });
    
    return NextResponse.json(profile, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
