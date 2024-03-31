'use client';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';

import { defaultSetData } from '@/components/DataSetTable/constants';
import { calculateMaxMinValues } from '@/components/DataSetTable/helpers';
import { ITableSet } from '@/components/DataSetTable/types';

const MAX_SET_VALUE = 1;
const MIN_SET_VALUE = 0;

const DataSetTable: React.FC = () => {
  const [tableValue, setTableValue] = useState<ITableSet[]>(calculateMaxMinValues(defaultSetData));

  const [AValue, setAValue] = useState<number | null>(null);
  const [BValue, setBValue] = useState<number | null>(null);

  const [isButtonDisable, setIsButtonDisable] = useState<boolean>(false);

  const toast = useRef<Toast>(null);

  const validNumbersValue = (value: number | null): number | null => {
    if (!value) {
      return value;
    }

    if (value > MAX_SET_VALUE) {
      return MAX_SET_VALUE;
    }

    if (value < MIN_SET_VALUE) {
      return MIN_SET_VALUE;
    }

    return value;
  };

  const handleSaveClick = () => {
    if (AValue && BValue) {
      setTableValue((prev) => {
        const lastSetNumber = prev[prev.length - 1].setNumber;

        const calculatedNewValues = calculateMaxMinValues([
          { setNumber: lastSetNumber + 1, setA: AValue, setB: BValue },
        ]);

        return [...prev, ...calculatedNewValues];
      });

      toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Table updated' });
    }
  };

  useEffect(() => {
    if (AValue && BValue) {
      setIsButtonDisable(true);
    }

    setIsButtonDisable(false);
  }, [AValue, BValue]);

  return (
    <div className='mb-4 flex flex-col gap-[20px]'>
      <Toast ref={toast} />
      <DataTable value={tableValue} scrollHeight='600px' scrollable className='w-full'>
        <Column field='setNumber' header='Set Number' />
        <Column field='setA' header='Set A' />
        <Column field='setB' header='Set B' />
        <Column field='setC' header='Set C' />
        <Column field='setD' header='Set D' />
      </DataTable>
      <div className='flex gap-[15px]'>
        <InputNumber
          placeholder='set A value'
          value={AValue}
          min={MIN_SET_VALUE}
          max={MAX_SET_VALUE}
          minFractionDigits={2}
          maxFractionDigits={2}
          onChange={(event) => {
            const inputNumber = Number(event.value);

            setAValue(validNumbersValue(inputNumber));
          }}
          onBlur={(event) => {
            const inputNumber = Number(event.target.value);

            setAValue(validNumbersValue(inputNumber));
          }}
        />
        <InputNumber
          placeholder='set B value'
          value={BValue}
          min={MIN_SET_VALUE}
          max={MAX_SET_VALUE}
          minFractionDigits={2}
          maxFractionDigits={2}
          onChange={(event) => {
            const inputNumber = Number(event.value);

            setBValue(validNumbersValue(inputNumber));
          }}
          onBlur={(event) => {
            const inputNumber = Number(event.target.value);

            setBValue(validNumbersValue(inputNumber));
          }}
        />
        <Button className='h-[42px]' onClick={handleSaveClick} disabled={isButtonDisable}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default DataSetTable;
