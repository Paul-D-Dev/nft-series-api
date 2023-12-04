import { AbstractRepository } from "./abstract.repository";

export abstract class AbstractService<T> {
  protected abstract repository: AbstractRepository<T>;

  async getAll(): Promise<T[]> {
    return await this.repository.findAll();
  }

  async getById(id: number): Promise<T | null> {
    return await this.repository.findById(id);
  }

  async post(element: T): Promise<T> {
    return await this.repository.post(element);
  }
}
