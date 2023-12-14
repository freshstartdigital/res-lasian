import { Paper, TextField } from '@mui/material';
import React, { FC } from 'react';

type InputTextProps = {
  label: string;
};

const InputText: FC<InputTextProps> = ({ label }) => {
  return (
    <Paper sx={{ px: 4, py: 2, mb: 2, width: '100%' }}>
      <TextField InputLabelProps={{ shrink: true }} fullWidth label={label} />
    </Paper>
  );
};

export default InputText;
