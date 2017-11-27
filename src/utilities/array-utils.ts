import * as R from 'ramda';

// appends a new element to the list, obtained by running f on the last element of the original list
// e.g. growSequence([1], R.add(2)) === [1, 3]
export function growSequence<T>(f: (x: T | undefined) => T, xs: T[]): T[] {
  return R.append<T>(R.pipe<T[], T, T>(R.last, f)(xs), xs);
}

// Merges 2 arrays, removing duplicates (as defined by the supplied equality function).
// Assumes both arrays are already composed of unique elements.
export function mergeArray<T>(l: T[], r: T[], equalityFn: (x: T, y: T) => boolean = R.equals): T[] {
  return R.ifElse(
    R.isEmpty,
    R.always(l),
    R.pipe(
      R.concat(l),
      R.uniqWith(equalityFn)
    )
  )(r);
}
