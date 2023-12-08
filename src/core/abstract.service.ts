import { AbstractRepository } from "./abstract.repository";
import { Put, Save } from "../interfaces/http-request";

export abstract class AbstractService<T, DB> {
  protected abstract repository: AbstractRepository<T, DB>;

  async getAll(): Promise<T[]> {
    return await this.repository.findAll();
  }

  async getById(id: number): Promise<T | null> {
    return await this.repository.findById(id);
  }

  async post(element: Save<T>): Promise<unknown> {
    return await this.repository.post(element);
  }

  async put(id: number, element: Put<T>): Promise<unknown> {
    return await this.repository.put(id, element);
  }

  async delete(id: number): Promise<unknown> {
    return await this.repository.delete(id);
  }
}
