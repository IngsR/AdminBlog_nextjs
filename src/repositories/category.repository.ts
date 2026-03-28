import { db } from '@/db';
import { categories } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { IBaseRepository } from './base.repository';

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export class CategoryRepository implements IBaseRepository<Category, string, NewCategory, Partial<NewCategory>> {
  async findAll(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async findById(id: string): Promise<Category | undefined> {
    const result = await db.select().from(categories).where(eq(categories.id, id));
    return result[0];
  }

  async findBySlug(slug: string): Promise<Category | undefined> {
    const result = await db.select().from(categories).where(eq(categories.slug, slug));
    return result[0];
  }

  async create(data: NewCategory): Promise<Category[]> {
    return await db.insert(categories).values(data).returning();
  }

  async update(id: string, data: Partial<NewCategory>): Promise<Category[]> {
    return await db.update(categories).set(data).where(eq(categories.id, id)).returning();
  }

  async delete(id: string): Promise<Category[]> {
    return await db.delete(categories).where(eq(categories.id, id)).returning();
  }
}
