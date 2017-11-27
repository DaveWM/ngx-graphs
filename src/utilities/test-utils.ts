import { Property, check } from "testcheck";
import * as R from 'ramda';

export const testRuns = {
  few: 5,
  average: 25,
  many: 100
};

export function checkIt<T>(description: string, property: Property<T>, numTests: number = testRuns.few) {
  it(description, () => {
    const result = check(property, {numTests: numTests});
    expect(result.fail).toBe(undefined, result);
  })
}

// like equals, but is lenient with floating point errors
export function areClose(x: number, y: number): boolean {
  const epsilon = 0.00001;
  const diff = Math.min(Math.abs(x - y), Math.abs((x - y) / x));
  return x === y || diff < epsilon;
}

export function setEquals<T>(xs: T[], ys: T[]) {
  return xs.length === ys.length
    && R.all(x => R.any(y => R.equals(x, y), ys), xs)
    && R.all(y => R.any(x => R.equals(x, y), xs), ys);
}
