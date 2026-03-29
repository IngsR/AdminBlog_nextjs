import { profiles } from '@/db/schema';
import { BaseRepository } from './base.repository';

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;

export class ProfileRepository extends BaseRepository<Profile, string, NewProfile, Partial<NewProfile>> {
  constructor() {
    super(profiles);
  }
}
