// Base repository interface for CRUD operations
export interface IBaseRepository<T, ID, CreateDTO, UpdateDTO> {
  findAll(): Promise<T[]>;
  findById(id: ID): Promise<T | undefined>;
  create(data: CreateDTO): Promise<T[]>;
  update(id: ID, data: UpdateDTO): Promise<T[]>;
  delete(id: ID): Promise<T[]>;
}
