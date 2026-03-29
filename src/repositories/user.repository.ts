import { db } from '@/db';
import { users } from '@/db/schema';
import { eq, or } from 'drizzle-orm';
import { BaseRepository } from './base.repository';

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export class UserRepository extends BaseRepository<User, string, NewUser, Partial<NewUser>> {
  constructor() {
    super(users);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async findByUsernameOrEmail(identifier: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(
      or(
        eq(users.username, identifier),
        eq(users.email, identifier)
      )
    );
    return result[0];
  }
}
