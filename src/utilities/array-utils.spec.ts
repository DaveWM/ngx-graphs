import {checkIt, setEquals, testRuns} from './test-utils';
import {gen, property} from 'testcheck';
import {growSequence, mergeArray} from './array-utils';
import * as R from 'ramda';

describe('array utilities', () => {
  describe('growSequence', () => {
    checkIt('should always return a sequence with one more element than the given sequence', property(
      gen.array(gen.any),
      (array: any[]) => {
        const result = growSequence(R.identity, array);

        return result.length === R.inc(array.length);
      }
      ),
      testRuns.average
    );

    checkIt('should return an array where the last element is f applied to the penultimate element, iff the given array is not empty', property(
      gen.array(gen.number.suchThat(Number.isFinite), {minSize: 1}),
      (array: any[]) => {
        const f = R.add(2);

        const result = growSequence(f, array);

        const [last, penultimate] = R.reverse(result);
        return last === f(penultimate);
      }
      ),
      testRuns.average
    );

    it('should return [f(undefined)] when given an empty list', () => {
      const result = growSequence(R.identity, []);

      expect(result).toEqual([undefined]);
    });
  });

  describe('mergeArray', () => {
    it('should return the left array when the right array is empty', () => {
      const leftArray = R.range(0, 10);
      expect(mergeArray(leftArray, [])).toEqual(leftArray);
    });

    it('should return the right array when the left array is empty', () => {
      const rightArray = R.range(0, 10);
      expect(mergeArray([], rightArray)).toEqual(rightArray);
    });

    it('should concatenate the left and right arrays', () => {
      const all = R.range(0, 10);
      expect(mergeArray(R.take(5, all), R.drop(5, all))).toEqual(all);
    });

    checkIt('should always return an array of unique elements, as compared by deep equality (by default)', property(
      // TODO: use gen.any here - throws an error though, don't know why
      gen.uniqueArray(gen.string),
      gen.uniqueArray(gen.string),
      (l, r) => {
        const result = mergeArray(l, r);

        const unique = R.uniqWith(R.equals, result);

        return result.length === unique.length;
      }
    ), testRuns.average);

    checkIt('should always return an array of unique elements, as compared by the equality function (when supplied)', property(
      gen.array(gen.int),
      gen.array(gen.int),
      (l, r) => {
        const equalityFn = (x: number,y: number) => (x % 10) === (y % 10);
        const [uniqueL, uniqueR] = R.map(R.uniqWith(equalityFn), [l, r]);
        const result = mergeArray(uniqueL, uniqueR, equalityFn);

        const unique = R.uniqWith(equalityFn, result);

        if(result.length != unique.length){
          console.log(result.length, unique.length, result, unique);
        }
        return result.length === unique.length;
      }
    ), testRuns.average);
  });
});
