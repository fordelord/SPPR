import Big from 'big.js';

import { outputSignal, YValue } from '@/components/probability/constants';

export const getOutputYSignal = (data: number[]): number => {
  return data
    .reduce((previousValue, currentValue, currentIndex) => {
      const currentBig = Big(currentValue);
      const outputBig = Big(outputSignal[currentIndex]);
      const product = currentBig.times(outputBig);

      return product.plus(previousValue);
    }, Big(0))
    .toNumber();
};

export const getModifiedOutputSignal = () => {
  return outputSignal.map((currentSignal) => -1 * currentSignal * YValue * 2);
};

export const getWeightCorrection = (data: number[]) => {
  const modifiedOutputSignal = getModifiedOutputSignal();

  return data.map((currentSignal: number, index: number) => {
    return Number(Big(currentSignal).plus(Big(modifiedOutputSignal[index])));
  });
};

export const calculateCountOfIterations = (inputData: number[], count = 1): number | string => {
  const weightCorrection = getWeightCorrection(inputData);

  const outputYSignal = getOutputYSignal(weightCorrection);

  if (count > 100) {
    return 'Too many iterations';
  }

  if (outputYSignal > 0) {
    count = count + 1;

    return calculateCountOfIterations(weightCorrection, count);
  }

  return count;
};
