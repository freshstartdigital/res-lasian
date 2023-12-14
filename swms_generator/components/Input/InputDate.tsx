import { Paper, TextField } from '@mui/material';
import React, { FC } from 'react';

type InputDateProps = {
  label: string;
};

const InputDate: FC<InputDateProps> = ({ label }) => {
  return (
    <Paper sx={{ px: 4, py: 2, mb: 2, width: '100%' }}>
      <TextField InputLabelProps={{ shrink: true }} type="date" fullWidth label={label} />
    </Paper>
  );
};

export default InputDate;
