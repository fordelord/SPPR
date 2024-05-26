'use client';

import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';

import { outputSignal } from '@/components/probability/constants';
import { calculateCountOfIterations, getOutputYSignal } from '@/components/probability/helpers';

const Probability = () => {
  const [firstMatrixValue, setFirstMatrixValue] = useState<number | null>();
  const [secondMatrixValue, setSecondMatrixValue] = useState<number | null>();
  const [thirdMatrixValue, setThirdMatrixValue] = useState<number | null>();

  const toast = useRef<Toast>(null);

  const calculateResult = (inputData = [0.5, 0.1, 1]) => {
    const outputYSignal = getOutputYSignal(inputData);

    return outputYSignal > 0 ? calculateCountOfIterations(inputData) : 1;
  };

  const [result, setResult] = useState<number | string>(calculateResult());

  const handleClick = () => {
    if (firstMatrixValue && secondMatrixValue && thirdMatrixValue) {
      setResult(calculateResult([firstMatrixValue, secondMatrixValue, thirdMatrixValue]));

      toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Result updated' });

      return;
    }

    toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Fill inputs correct' });

    return;
  };

  return (
    <div className='flex flex-col gap-[10px]'>
      <div>
        <Toast ref={toast} />
        <InputNumber
          placeholder='First matrix value'
          min={0}
          max={1}
          minFractionDigits={2}
          maxFractionDigits={2}
          value={firstMatrixValue}
          onChange={(e) => {
            setFirstMatrixValue(e.value);
          }}
        />
        <InputNumber
          placeholder='Second matrix value'
          min={0}
          max={1}
          minFractionDigits={2}
          maxFractionDigits={2}
          value={secondMatrixValue}
          onChange={(e) => {
            setSecondMatrixValue(e.value);
          }}
        />
        <InputNumber
          placeholder='Third matrix value'
          min={0}
          max={1}
          minFractionDigits={2}
          maxFractionDigits={2}
          value={thirdMatrixValue}
          onChange={(e) => {
            setThirdMatrixValue(e.value);
          }}
        />
        <Button label='Calculate result' onClick={handleClick} />
      </div>

      <div className='flex gap-[10px]'>
        Output signal [
        {outputSignal.map((signal, index) => {
          return <div key={index}>{signal}, </div>;
        })}
        ]
      </div>

      <div>Iterations count: {result}</div>
    </div>
  );
};

export default Probability;
