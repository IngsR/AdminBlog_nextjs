import { db } from '@/db';
import { eq } from 'drizzle-orm';

// Base repository interface for CRUD operations
export interface IBaseRepository<T, ID, CreateDTO, UpdateDTO> {
  findAll(): Promise<T[]>;
  findById(id: ID): Promise<T | undefined>;
  create(data: CreateDTO): Promise<T[]>;
  update(id: ID, data: UpdateDTO): Promise<T[]>;
  delete(id: ID): Promise<T[]>;
}

export abstract class BaseRepository<T, ID, CreateDTO, UpdateDTO> implements IBaseRepository<T, ID, CreateDTO, UpdateDTO> {
  constructor(protected table: any) {}

  async findAll(): Promise<T[]> {
    return await db.select().from(this.table);
  }

  async findById(id: ID): Promise<T | undefined> {
    const result = await db.select().from(this.table).where(eq(this.table.id, id));
    return result[0] as T | undefined;
  }

  async create(data: CreateDTO): Promise<T[]> {
    return await db.insert(this.table).values(data as any).returning() as T[];
  }

  async update(id: ID, data: UpdateDTO): Promise<T[]> {
    const updateData = { ...data as any };
    
    // Auto-update timestamps if they exist on the table schema
    if (this.table.updatedAt && !updateData.updatedAt) {
      updateData.updatedAt = new Date();
    }
    if (this.table.updated_at && !updateData.updated_at) {
      updateData.updated_at = new Date();
    }

    return await db.update(this.table).set(updateData).where(eq(this.table.id, id)).returning() as T[];
  }

  async delete(id: ID): Promise<T[]> {
    return await db.delete(this.table).where(eq(this.table.id, id)).returning() as T[];
  }
}

