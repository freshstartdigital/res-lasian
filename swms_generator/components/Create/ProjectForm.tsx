import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { Fragment, useState } from 'react';
import InputText from '../Input/InputText';
import InputDate from '../Input/InputDate';

const FORM_DATA = [
  { label: 'Site Name', type: 'text', step: 0 },
  { label: 'Date Developed', type: 'date', step: 0 },
  { label: 'Approval Date', type: 'date', step: 0 },
  { label: 'Date Last Reviewed', type: 'date', step: 0 },
  { label: 'Next Review Date', type: 'date', step: 0 }
];

const ProjectForm = () => {
  const [step, setStep] = useState(0);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitting');
    setStep(step + 1);
  };
  return (
    <Box component="form" onSubmit={submitHandler} sx={{ width: '600px' }}>
      <Typography variant="h6">Project Information</Typography>
      {FORM_DATA.filter((e) => e.step == step).map(({ label, type }) => {
        return (
          <Fragment key={label}>
            {type === 'text' && <InputText label={label} />}
            {type === 'date' && <InputDate label={label} />}
          </Fragment>
        );
      })}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 2
        }}>
        <Button sx={{ width: 150 }} variant="outlined">
          Cancel
        </Button>
        <Button type="submit" sx={{ width: 150 }} variant="contained">
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectForm;
