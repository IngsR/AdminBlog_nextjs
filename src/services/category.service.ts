import { CategoryRepository, Category, NewCategory } from '@/repositories/category.repository';
import { generateSlug } from '@/utils/slug';

export class CategoryService {
  private repository: CategoryRepository;

  constructor() {
    this.repository = new CategoryRepository();
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.repository.findAll();
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    return await this.repository.findById(id);
  }

  async createCategory(name: string): Promise<Category> {
    const slug = generateSlug(name);
    // Check if slug exists
    const existing = await this.repository.findBySlug(slug);
    if (existing) {
      throw new Error('Category with this name/slug already exists');
    }

    const result = await this.repository.create({ name, slug });
    return result[0];
  }

  async updateCategory(id: string, name: string): Promise<Category> {
    const slug = generateSlug(name);
    const existing = await this.repository.findBySlug(slug);
    if (existing && existing.id !== id) {
      throw new Error('Category with this name/slug already exists');
    }

    const result = await this.repository.update(id, { name, slug });
    if (!result.length) throw new Error('Category not found');
    return result[0];
  }

  async deleteCategory(id: string): Promise<Category> {
    const result = await this.repository.delete(id);
    if (!result.length) throw new Error('Category not found');
    return result[0];
  }
}
