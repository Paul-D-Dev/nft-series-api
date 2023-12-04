import { AbstractRepository } from "./abstract.repository";
import { Save } from "../interfaces/http-request";

export abstract class AbstractService<T, JSON, DB> {
  protected abstract repository: AbstractRepository<T, JSON, DB>;

  async getAll(): Promise<JSON[]> {
    return await this.repository.findAll();
  }

  async getById(id: number): Promise<JSON | null> {
    return await this.repository.findById(id);
  }

  async post(element: Save<T>): Promise<unknown> {
    return await this.repository.post(element);
  }
}
