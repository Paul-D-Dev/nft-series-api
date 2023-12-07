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
}
