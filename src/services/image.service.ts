import { ImageRepository } from "../repositories/image.repository";

export class ImageService {
  protected repository = new ImageRepository();

  async getById(id: number) {
    try {
      return await this.repository.getById(id);
    } catch (e) {
      throw e;
    }
  }

  async post(body: any, path: string): Promise<number> {
    try {
      const element = {
        ...body,
        src: path
      };
      return await this.repository.post(element);
    } catch (e) {
      throw e;
    }
  }

  async delete(id: number): Promise<any> {
    try {
      return await this.repository.delete(id);
    } catch (e) {
      throw e;
    }
  }
}
