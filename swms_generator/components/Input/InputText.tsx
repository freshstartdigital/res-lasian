import { Paper, TextField } from '@mui/material';
import React, { FC } from 'react';

type InputTextProps = {
  label: string;
  changeHandler: (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  field: string;
  value?: string;
};

const InputText: FC<InputTextProps> = ({ label, changeHandler, field, value }) => {
  return (
    <Paper sx={{ px: 4, py: 2, mb: 2, width: '100%' }}>
      <TextField
        value={value}
        onChange={changeHandler(field)}
        InputLabelProps={{ shrink: true }}
        fullWidth
        label={label}
      />
    </Paper>
  );
};

export default InputText;
