import {coordinateTransform, round, scale, updateIn} from './misc-utils';
import {areClose, checkIt} from "./test-utils";
import {gen, property} from 'testcheck';
import * as R from 'ramda';

describe('miscellaneous utils', () => {
  describe('scale', () => {
    // for consistency with ramda range function
    it('should return an empty array when the min is greater than the max', () => {
      expect(scale(10, 1, 10)).toEqual([]);
    });

    // for consistency with ramda range function
    it('should return an empty array when the numTicks param is negative', () => {
      expect(scale(1, 10, -1)).toEqual([]);
    });

    checkIt('should always return an array with the length of the "numTicks" parameter', property(
      gen.array(gen.posNumber, {size: 2}).suchThat(([min, max]) => min <= max),
      gen.posInt,
      ([min, max], numTicks) => {
        const result = scale(min, max, numTicks);

        return result.length === numTicks;
      }
      ),
      50
    );

    it('should return an array of just the min value when numTicks is 1', () => {
      expect(scale(1, 10, 1)).toEqual([1]);
    });

    checkIt('should always return an array where the first element is the min value and the last value is the max value, when numTicks > 1', property(
      gen.array(gen.posNumber, {size: 2})
        .suchThat(R.all(Number.isFinite))
        .then(R.sortBy(R.identity)),
      gen.posInt.suchThat(i => i > 1 && Number.isFinite(i)),
      ([min, max]: [number, number], numTicks) => {
        const result = scale(min, max, numTicks);
        return R.and(
          areClose(R.head(result) || 0, min),
          areClose(R.last<number>(result) || 0, max)
        );
      }
      ),
      50
    );

    checkIt('should always return an increasing arithmetic progression (i.e. difference between adjacent elements is constant)', property(
      gen.array(gen.posNumber, {size: 2})
        .suchThat(R.all(Number.isFinite))
        .then(R.sortBy(R.identity)),
      gen.posInt.suchThat(i => i > 1 && Number.isFinite(i)),
      ([min, max]: [number, number], numTicks) => {
        const result = scale(min, max, numTicks);

        return R.pipe(
          R.aperture(2),
          R.map(([x, y]: [number, number]) => y - x),
          R.uniqWith(areClose),
          (uniqueDiffs: number[]) => uniqueDiffs.length === 1 && uniqueDiffs[0] >= 0
        )(result);
      }
      ),
      50
    );
  });

  describe('coordinateTransform', () => {

    // returns true if value is between x and y, or pretty close
    function almostBetween(x: number, y: number, value: number) {
      const epsilon = 0.000001;
      return (x <= y ? value >= x && value <= y : value <= x && value >= y)
        || (Math.abs(x - value) < epsilon || Math.abs(y - value) < epsilon);
    }

    checkIt('should always return a value within the bounds of the new coordinate system, when the original value is within the bounds of the old coordinate system', property(
      gen.array(gen.numberWithin(-100000, 100000).suchThat(Number.isFinite), {size: 2}),
      gen.array(gen.numberWithin(-100000, 100000).suchThat(Number.isFinite), {size: 2}),
      gen.number.suchThat(Number.isFinite),
      (newCoords: [number, number], oldCoords: [number, number], i) => {
        const [min, max] = R.apply(R.lte, oldCoords) ? oldCoords : R.reverse(oldCoords);
        const point = R.clamp(min, max, i);

        const result = coordinateTransform(newCoords, oldCoords, point);

        return almostBetween(newCoords[0], newCoords[1], result);
      }
    ),
    100);

    it('should return the correct point in the new coordinate system', () => {
      const result = coordinateTransform([0, 500], [10, 110], 60);
      expect(result).toBe(250);
    });

    it('should return the minimum point of the new coordinate system when the min and max of the old coordinate system are the same', () => {
      const result = coordinateTransform([100, 500], [1, 1], 1);
      expect(result).toBe(100);
    });
  });

  describe('round', () => {

    function numberDecimalPlaces(n: number): number{
      const regex = new RegExp(`\\.\\d\*`, 'g');
      const matches = n.toString().match(regex);
      return matches && matches[0] ? matches[0].length - 1 : 0;
    }

    checkIt('should return a result with at most the given number of decimal places', property(
      gen.number.suchThat(Number.isFinite),
      gen.posInt.suchThat(Number.isFinite),
      (i, dp) => {
        const regex = new RegExp(`\\.\\d{${dp + 1},}`, 'g');

        const result = round(i, dp);

        return result !== undefined && !regex.test(result.toString());
      }
    ), 50);

    checkIt('should never increase the number of decimal places', property(
      gen.number.suchThat(Number.isFinite),
      gen.posInt.suchThat(Number.isFinite),
      (i, dp) => {
        const originalDP = numberDecimalPlaces(i);

        const result = round(i, dp);

        const resultDP = numberDecimalPlaces(result || 0);
        return originalDP >= resultDP;
      }
    ), 50);

    it('should return undefined when the decimal places parameter is negative', () => {
      expect(round(1.2, -1)).toBeUndefined();
    });
  });

  describe('updateIn', () => {
    it('should not modify the object when given an empty path', () => {
      const initialObj = {a: 123};

      const result = updateIn([], R.inc, initialObj);

      expect(result).toEqual(initialObj);
    });

    it('should use the update function to update a top level property', () => {
      const initialObj = {a: 1};

      const result = updateIn(['a'], R.inc, initialObj);

      expect(result).toEqual({a: 2});
    });

    it('should use the update function to update a nested property', () => {
      const initialObj = {a: {b: 1}, c: 2};

      const result = updateIn(['a', 'b'], R.inc, initialObj);

      expect(result).toEqual({a: {b: 2}, c: 2});
    });
  });
});
