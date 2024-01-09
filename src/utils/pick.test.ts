import { pick } from "./pick";

const initInputObject: Record<string, any> = {
  params: '1',
  body: {}
};

test('pick the right keys in the object', () => {
  const result = pick(initInputObject, ['params']);
  expect(result).toEqual({ params: '1' });
});

test('should preserve the original object', () => {
  const result = pick(initInputObject, ['params']);
  expect(initInputObject).toEqual(initInputObject);
});

test('handling duplicate in keys array', () => {
  const result = pick(initInputObject, ['params', 'params']);
  expect(result).toEqual({ params: '1' });
});

test('handling nested object', () => {
  const inputObject = {
    ...initInputObject,
    body: {
      c: 2,
      d: 3
    }
  };

  const result = pick(inputObject, ['body']);
  expect(result).toEqual({ body: { c: 2, d: 3 } });
});

describe('should return an empty object', () => {

  describe('handling cases with keys array', () => {
    test('if non-existing keys', () => {
      const result = pick(initInputObject, ['schema']);
      expect(result).toEqual({});
    });

    test('if keys array is empty []', () => {
      const result = pick(initInputObject, []);
      expect(result).toEqual({});
    });
  });

  describe('handling cases with object', () => {
    test('if inputObject = {}', () => {
      const inputObject = {};
      const result = pick(inputObject, ['params']);
      expect(result).toEqual({});
    });

    test('if inputObject = undefined', () => {
      const inputObject = undefined;
      const result = pick(inputObject, ['params']);
      expect(result).toEqual({});
    });

    test('if inputObject = null', () => {
      const inputObject = null;
      const result = pick(inputObject, ['params']);
      expect(result).toEqual({});
    });
  });

});




