import { db } from '@/db';
import { users } from '@/db/schema';
import { eq, or } from 'drizzle-orm';
import { IBaseRepository } from './base.repository';

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export class UserRepository implements IBaseRepository<User, string, NewUser, Partial<NewUser>> {
  async findAll(): Promise<User[]> {
    return await db.select().from(users);
  }

  async findById(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
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

  async create(data: NewUser): Promise<User[]> {
    return await db.insert(users).values(data).returning();
  }

  async update(id: string, data: Partial<NewUser>): Promise<User[]> {
    data.updatedAt = new Date();
    return await db.update(users).set(data).where(eq(users.id, id)).returning();
  }

  async delete(id: string): Promise<User[]> {
    return await db.delete(users).where(eq(users.id, id)).returning();
  }
}
