import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

export default function ControlledRadioButtons({data, handleChange, selectedValue}) {
  



  return (
    <div>
      <RadioGroup row sx={{ml:14, mt: 1.5}}>
    {data.map((mint, index) => (
        <div key={index}>
        <Radio
        
        checked={selectedValue === mint}
        onChange={handleChange}
        value={mint}
        name="radio-buttons"
        inputProps={{ 'aria-label': 'Option 1' }}
      />
        {mint}        
          
          </div>
          
          
          ))}
          </RadioGroup>
    </div>
  );
}
