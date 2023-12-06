export const removedUndefinedValueInObject = (object: Record<string, any>): Record<string, any> => {
  Object.keys(object).forEach(key => object[key] === undefined && delete object[key]);
  return object;
}
