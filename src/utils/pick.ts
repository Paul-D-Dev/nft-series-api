/**
 * Extracts specified keys from an object.
 * @param {Record<string, any>} object - The source object.
 * @param {string[]} keys - An array of keys to extract from the object.
 * @returns {Record<string, any>} - An object containing only the specified keys.
 */
export const pick = (object: Record<string, any>, keys: string[]) => {
  // Reduces the keys array to a new object containing only the specified keys.
  return keys.reduce((obj: Record<string, any>, key: string) => {
    // Checks if the key exists in the source object before adding it to the new object.
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};
