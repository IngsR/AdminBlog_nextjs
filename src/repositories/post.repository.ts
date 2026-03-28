import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { IBaseRepository } from './base.repository';

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

export class PostRepository implements IBaseRepository<Post, string, NewPost, Partial<NewPost>> {
  async findAll(): Promise<Post[]> {
    return await db.select().from(posts).orderBy(desc(posts.createdAt));
  }

  async findById(id: string): Promise<Post | undefined> {
    const result = await db.select().from(posts).where(eq(posts.id, id));
    return result[0];
  }

  async findBySlug(slug: string): Promise<Post | undefined> {
    const result = await db.select().from(posts).where(eq(posts.slug, slug));
    return result[0];
  }

  async create(data: NewPost): Promise<Post[]> {
    return await db.insert(posts).values(data).returning();
  }

  async update(id: string, data: Partial<NewPost>): Promise<Post[]> {
    data.updatedAt = new Date();
    return await db.update(posts).set(data).where(eq(posts.id, id)).returning();
  }

  async delete(id: string): Promise<Post[]> {
    return await db.delete(posts).where(eq(posts.id, id)).returning();
  }
}
