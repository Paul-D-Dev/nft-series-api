import { ImageRepository } from "../repositories/image.repository";

export class ImageService {
  protected repository = new ImageRepository();

  async getById(id: number) {
    return await this.repository.getById(id);
  }

  async post(body: any, path: string): Promise<number> {
    const element = {
      ...body,
      src: path
    };
    return await this.repository.post(element);
  }

  async delete(id: number): Promise<any> {
    try {
      return await this.repository.delete(id);
    } catch (e) {
      throw e;
    }
  }
}
