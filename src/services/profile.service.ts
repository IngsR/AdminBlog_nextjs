import { ProfileRepository, Profile, NewProfile } from '@/repositories/profile.repository';

export class ProfileService {
  private repository: ProfileRepository;

  constructor() {
    this.repository = new ProfileRepository();
  }

  async getAllProfiles(): Promise<Profile[]> {
    return await this.repository.findAll();
  }

  async getProfileById(id: string): Promise<Profile | undefined> {
    return await this.repository.findById(id);
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
