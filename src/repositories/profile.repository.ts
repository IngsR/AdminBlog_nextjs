import { db } from '@/db';
import { profiles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { IBaseRepository } from './base.repository';

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;

export class ProfileRepository implements IBaseRepository<Profile, string, NewProfile, Partial<NewProfile>> {
  async findAll(): Promise<Profile[]> {
    return await db.select().from(profiles);
  }

  async findById(id: string): Promise<Profile | undefined> {
    const result = await db.select().from(profiles).where(eq(profiles.id, id));
    return result[0];
  }

  async create(data: NewProfile): Promise<Profile[]> {
    return await db.insert(profiles).values(data).returning();
  }

  async update(id: string, data: Partial<NewProfile>): Promise<Profile[]> {
    data.updated_at = new Date();
    return await db.update(profiles).set(data).where(eq(profiles.id, id)).returning();
  }

  async delete(id: string): Promise<Profile[]> {
    return await db.delete(profiles).where(eq(profiles.id, id)).returning();
  }
}
