import { removedUndefinedValueInObject } from './removedUndefinedValueInObject';

test('removes undefined values from an object', () => {
  const inputObject = {
    a: 1,
    b: undefined,
    c: 'hello',
    d: undefined,
  };

  const result = removedUndefinedValueInObject(inputObject);

  // Ensure that undefined values are removed
  expect(result).toEqual({ a: 1, c: 'hello' });

  // Ensure the original object is not modified
  expect(inputObject).toEqual({
    a: 1,
    b: undefined,
    c: 'hello',
    d: undefined,
  });
});

test('returns the same object if it has no undefined values', () => {
  const inputObject = {
    a: 1,
    b: 'hello',
    c: true,
  };

  const result = removedUndefinedValueInObject(inputObject);

  // Ensure the result is the same as the input when no undefined values are present
  expect(result).toEqual(inputObject);
});

test('returns an empty object if given an empty object', () => {
  const inputObject = {};

  const result = removedUndefinedValueInObject(inputObject);

  // Ensure the result is an empty object
  expect(result).toEqual({});
});
