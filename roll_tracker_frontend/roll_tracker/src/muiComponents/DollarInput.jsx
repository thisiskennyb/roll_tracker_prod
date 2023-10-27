import React from 'react';
import { NumericFormat } from 'react-number-format';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';


export default function DollarInput ({onChangeHandler}) {

  return (
<FormControl fullWidth sx={{ m: 1, width: 300 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            onChange={onChangeHandler}
            sx={{backgroundColor: '#67bace', color: '#25272c', fontFamily: 'Fira Sans Extra Condensed', 
          borderColor: 'orange'}}
          />
        </FormControl>
  );
}




