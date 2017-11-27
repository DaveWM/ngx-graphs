import * as R from 'ramda';

export function scale(min: number, max: number, numTicks: number): number[] {
  if(numTicks <= 0 || min > max) {
    return [];
  }
  return R.pipe(
    R.range(0),
    R.map(R.when(
      R.always(numTicks > 1),
      R.multiply((max - min) / R.dec(numTicks))
    )),
    R.map(R.add(min))
  )(numTicks);
}

// note: point should be within the bounds of the old coordinate system
export function coordinateTransform([newMin, newMax]: [number, number], [oldMin, oldMax]: [number, number], point: number): number {
  const oldRange = oldMax - oldMin;
  const newRange = newMax - newMin;
  const rangeRatio = oldRange !== 0 ? newRange / oldRange : 0;

  const result = (point - oldMin) * rangeRatio + newMin;

  // return +/- Number.MAX_VALUE when the result is +/- Infinity
  // the result will usually be used when dealing with svgs or some other graphical system
  // so IMO makes more sense to return an actual number rather than infinity, even if it is technically incorrect
  return R.cond([
    [Number.isFinite, R.always(result)],
    [R.lt(0), R.always(Number.MAX_VALUE)],
    [R.T, R.always(-Number.MAX_VALUE)]
  ])(result);
}

export function round(n: number, decimalPlaces: number): number | undefined {
  if(decimalPlaces < 0){
    return undefined;
  }

  const multiplier = Math.pow(10, decimalPlaces);
  const rounded = Math.round(n * multiplier);
  const result = rounded / multiplier;

  // rounding errors sometimes cause the result to be longer than n
  // just return n in this situation
  return result.toString().length > n.toString().length ? n : result;
}

function _updateIn(path: string[], updateFn: (prop: any) => any, obj: any): any {
  if(!path.length){
    return obj;
  }
  const lens = R.lensPath(path);
  return R.over(lens, updateFn, obj);
}

export const updateIn = R.curry(_updateIn);
