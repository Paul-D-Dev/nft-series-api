import { CustomError } from "../models/custom-error.model";
import { handleCatchError } from "./handleCatchError";

describe('handleCatchError function', () => {
  test('throws the same CustomError instance', () => {
    const customError = new CustomError(404, 'Not Found');

    try {
      handleCatchError(customError);
      // If the function doesn't throw an error, the test fails
      fail('Expected handleCatchError to throw an error');
    } catch (error) {
      // Ensure the thrown error is the same CustomError instance
      expect(error).toBe(customError);
    }
  });

  test('throws a new CustomError for non-CustomError input', () => {
    try {
      handleCatchError('Some non-CustomError value');
      // If the function doesn't throw an error, the test fails
      fail('Expected handleCatchError to throw an error');
    } catch (error) {
      // Ensure the thrown error is an instance of CustomError
      expect(error).toBeInstanceOf(CustomError);
      // Ensure the error has the correct status code and message
      if (error instanceof CustomError) {
        expect(error.status).toBe(500);
        expect(error.message).toBe('Internal Server Error');
      }
    }
  });

  test('logs the error for non-CustomError input', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
    });

    try {
      handleCatchError('Some non-CustomError value');
      // If the function doesn't throw an error, the test fails
      fail('Expected handleCatchError to throw an error');
    } catch (error) {
      // Ensure the console.error method was called with the expected argument
      expect(consoleErrorSpy).toHaveBeenCalledWith('handleCatchError: ', 'Some non-CustomError value');
    } finally {
      // Restore the original implementation of console.error
      consoleErrorSpy.mockRestore();
    }
  });
});
