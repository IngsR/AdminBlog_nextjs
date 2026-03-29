import { db } from '@/db';
import { categories } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { BaseRepository } from './base.repository';

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export class CategoryRepository extends BaseRepository<Category, string, NewCategory, Partial<NewCategory>> {
  constructor() {
    super(categories);
  }

  async findBySlug(slug: string): Promise<Category | undefined> {
    const result = await db.select().from(categories).where(eq(categories.slug, slug));
    return result[0];
  }
}
