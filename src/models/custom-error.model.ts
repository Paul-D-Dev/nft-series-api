import { ICustomError } from "../interfaces/custom-error.interface";

export class CustomError implements ICustomError {
  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }

  readonly status: number;
  readonly message: string;
}
