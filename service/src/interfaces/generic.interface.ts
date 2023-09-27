export interface IGenericRepository<T> {
  count(): Promise<number>;
  findAll(): Promise<T[]>;
  findTrashAll(): Promise<T[]>;
  findOne(id: string): Promise<T>;
  create(item: T): Promise<T>;
  update(id: string, item: T): Promise<boolean>;
  remove(id: string): Promise<boolean>;
  restore(id: string): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
