import React, { useState } from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
}

function RangeSlider({ min, max }: RangeSliderProps) {
  const [value1, setValue1] = useState<number>(25);
  const [value2, setValue2] = useState<number>(75);

  const handleValue1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue1(parseInt(e.target.value));
  };

  const handleValue2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue2(parseInt(e.target.value));
  };

  return (
    <div>
      <input type="range" min={min} max={max} value={value1} onChange={handleValue1Change} />
      <input type="range" min={min} max={max} value={value2} onChange={handleValue2Change} />
      <div>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: `${value1}%`, transform: 'translateX(-50%)' }}>
            <div style={{ width: '10px', height: '10px', backgroundColor: 'red', borderRadius: '50%' }}></div>
          </div>
          <div style={{ position: 'absolute', left: `${value2}%`, transform: 'translateX(-50%)' }}>
            <div style={{ width: '10px', height: '10px', backgroundColor: 'blue', borderRadius: '50%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RangeSlider;
