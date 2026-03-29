import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { BaseRepository } from './base.repository';

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

export class PostRepository extends BaseRepository<Post, string, NewPost, Partial<NewPost>> {
  constructor() {
    super(posts);
  }

  async findAll(): Promise<Post[]> {
    return await db.select().from(posts).orderBy(desc(posts.createdAt));
  }

  async findBySlug(slug: string): Promise<Post | undefined> {
    const result = await db.select().from(posts).where(eq(posts.slug, slug));
    return result[0];
  }
}
