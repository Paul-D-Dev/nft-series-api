/**
 * Extracts the reason from a validation error message.
 * - Input: '"name" must be a string'
 * - Split: ['', 'name', ' must be a string']
 * - Output 'must be a string'
 * @param {string} errorMessage - The validation error message.
 * @returns {string} - The extracted reason.
 */
export const extractJoiError = (errorMessage: string): string => {
  if (!errorMessage || errorMessage === '') {
    throw new Error('Error message is empty');
  }

  // Splitting the error message using the ".
  const parts = errorMessage.split('"');

  // The reason is the part after the property name.

  if (!parts[2]) {
    throw new Error('Could not find the error message');
  }
  return parts[2].trim();
};
