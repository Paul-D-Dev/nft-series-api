import { ImageRepository } from "../repositories/image.repository";
import { handleCatchError } from "../utils/handleCatchError";

export class ImageService {
  protected repository = new ImageRepository();

  async getById(id: number) {
    try {
      return await this.repository.getById(id);
    } catch (e) {
      return handleCatchError(e);
    }
  }

  async post(body: any, path: string): Promise<number> {
    const element = { ...body, src: path };
    try {
      return await this.repository.post(element);
    } catch (e) {
      return handleCatchError(e);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      return await this.repository.delete(id);
    } catch (e) {
      return handleCatchError(e);
    }
  }
}
