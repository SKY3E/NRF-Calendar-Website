import React from 'react';
import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function Calendar() {
  const [value, setValue] = useState(null);
  return (
    <section>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker 
          label="Item Date"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgb(30,41,59)',
              borderWidth: 3,
            }, 
            color: 'rgb(30,41,59)',
          }}
        />
      </LocalizationProvider>
    </section>
  );
}