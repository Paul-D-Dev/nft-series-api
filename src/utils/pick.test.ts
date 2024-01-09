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
  const result = pick(initInputObject, []);
  expect(result).toEqual(initInputObject);
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


test('performance test: extracting keys from a large object', () => {
  const generateLargeObject = (numKeys: number): Record<string, any> => {
    const largeObject: Record<string, any> = {};
    for (let i = 0; i < numKeys; i++) {
      largeObject[`key${i}`] = i;
    }
    return largeObject;
  };

  const numKeys = 100000;

  // Generate a large object with specified number of keys
  const largeObject = generateLargeObject(numKeys);

  // Measure the time taken to execute the pick function
  const startTime = Date.now();
  const result = pick(largeObject, ['key0', 'key1', 'key2']); // Replace with actual keys
  const endTime = Date.now();
  const executionTime = endTime - startTime;

  // Log the execution time (you can remove this in a real-world scenario)
  console.log(`Execution time: ${executionTime} ms`);

  // You might want to set a threshold based on your performance expectations
  const performanceThreshold = 100;

  // Check if the execution time is within the acceptable threshold
  expect(executionTime).toBeLessThanOrEqual(performanceThreshold);
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




