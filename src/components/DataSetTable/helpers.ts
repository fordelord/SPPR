import { IBasicSet, ITableSet } from '@/components/DataSetTable/types';

export const calculateMaxMinValues = (data: IBasicSet[]): ITableSet[] => {
  return data.map(({ setNumber, setA, setB }) => {
    const setC = Math.min(setA, setB);
    const setD = Math.max(setA, setB);

    return {
      setNumber,
      setA,
      setB,
      setC,
      setD,
    };
  });
};
