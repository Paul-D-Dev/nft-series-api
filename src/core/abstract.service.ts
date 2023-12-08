import { AbstractRepository } from "./abstract.repository";
import { Put, Save } from "../interfaces/http-request";
import { Conditional } from "../types";

/**
 * - T: Type we will return to the client
 * - DB: Type we will register in the DB
 * - P: Type for the request Post or Put, if P = void then we will use T
 */
export abstract class AbstractService<T, DB, P = void> {
  protected abstract repository: AbstractRepository<T, DB, P>;

  async getAll(): Promise<T[]> {
    return await this.repository.findAll();
  }

  async getById(id: number): Promise<T | null> {
    return await this.repository.findById(id);
  }

  async post(element: Save<Conditional<P, T>>): Promise<number> {
    return await this.repository.post(element);
  }

  async put(id: number, element: Put<Conditional<P, T>>): Promise<unknown> {
    return await this.repository.put(id, element);
  }

  async delete(id: number): Promise<unknown> {
    return await this.repository.delete(id);
  }
}
