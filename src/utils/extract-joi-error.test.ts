import { extractJoiError } from "./extract-joi-error";

describe('extract Joi Error function', () => {

  test('should return the error message', () => {
    const inputErrorMessage: string = '"name" must be a string';
    const result = extractJoiError(inputErrorMessage);

    expect(result).toBe('must be a string');
  });

  test('handles errorMessage argument is an empty string', () => {
    const errorMessage = '';

    try {
      const result = extractJoiError(errorMessage);
      fail('Expected extractJoiError to throw an error');
    } catch (e) {
      const error = e as Error;
      expect(error.message).toBe('Error message is empty');
    }
  });

  test('handles undefined error message', () => {
    const errorMessage = undefined as unknown as string;
    try {
      const result = extractJoiError(errorMessage);
      fail('Expected extractJoiError to throw an error');
    } catch (e) {
      const error = e as Error;
      expect(error.message).toBe('Error message is empty');
    }
  });

  test('handles error message without property name', () => {
    const errorMessage = 'Validation failed';
    try {
      const result = extractJoiError(errorMessage);
      fail('Expected extractJoiError to throw an error');
    } catch (e) {
      const error = e as Error;
      expect(error.message).toBe('Could not find the error message');
    }

  });
});
