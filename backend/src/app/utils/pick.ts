/**
 * Helper to pick specific keys from an object (useful for filtering query params)
 */
const pick = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Partial<Pick<T, K>> => {
  const finalObj: Partial<Pick<T, K>> = {};

  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }

  return finalObj;
};

export default pick;
