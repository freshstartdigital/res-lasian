import { Paper, TextField } from '@mui/material';
import React, { FC } from 'react';

type InputDateProps = {
  label: string;
  changeHandler: (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  field: string;
  value?: string;
};

const InputDate: FC<InputDateProps> = ({ label, changeHandler, field, value }) => {
  return (
    <Paper sx={{ px: 4, py: 2, mb: 2, width: '100%' }}>
      <TextField
        value={value}
        onChange={changeHandler(field)}
        InputLabelProps={{ shrink: true }}
        type="date"
        fullWidth
        label={label}
      />
    </Paper>
  );
};

export default InputDate;
