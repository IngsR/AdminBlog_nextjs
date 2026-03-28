import { PostRepository, Post, NewPost } from '@/repositories/post.repository';
import { generateSlug } from '@/utils/slug';

export class PostService {
  private repository: PostRepository;

  constructor() {
    this.repository = new PostRepository();
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.repository.findAll();
  }

  async getPostById(id: string): Promise<Post | undefined> {
    return await this.repository.findById(id);
  }

  async createPost(data: Omit<NewPost, 'slug' | 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> {
    const slug = generateSlug(data.title);
    
    // Check if slug exists
    const existing = await this.repository.findBySlug(slug);
    if (existing) {
      throw new Error('Post with this title/slug already exists');
    }

    const result = await this.repository.create({ ...data, slug });
    return result[0];
  }

  async updatePost(id: string, data: Partial<Omit<NewPost, 'slug' | 'id' | 'createdAt' | 'updatedAt'>>): Promise<Post> {
    let updateData: Partial<NewPost> = { ...data };
    
    if (data.title) {
      const slug = generateSlug(data.title);
      const existing = await this.repository.findBySlug(slug);
      if (existing && existing.id !== id) {
        throw new Error('Post with this title/slug already exists');
      }
      updateData.slug = slug;
    }

    const result = await this.repository.update(id, updateData);
    if (!result.length) throw new Error('Post not found');
    return result[0];
  }

  async deletePost(id: string): Promise<Post> {
    const result = await this.repository.delete(id);
    if (!result.length) throw new Error('Post not found');
    return result[0];
  }
}
