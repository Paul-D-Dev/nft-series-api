import { CustomError } from "../models/custom-error.model";

export const handleCatchError = (e: unknown | CustomError) => {
  if (e instanceof CustomError) {
    throw e;
  } else {
    console.error('handleCatchError: ', e);
    throw new CustomError(500, 'Internal Server Error');
  }
};
