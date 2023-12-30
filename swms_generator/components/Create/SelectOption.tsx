import { Button, Paper, Typography } from '@mui/material';
import React, { FC } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type SelectOptionProps = {
  SelectHandler: (Component: string) => () => void;
};

const SelectOption: FC<SelectOptionProps> = ({ SelectHandler }) => {
  return (
    <Paper
      sx={{
        p: 10,
        height: '400px',
        margin: 'auto'
      }}>
      <Typography sx={{ mb: 2 }} textAlign="center" variant="h4">
        Create a SWMS
      </Typography>
      <Typography sx={{ mb: 2 }} textAlign="center" variant="body1">
        Choose a template to get started
      </Typography>
      <Button
        disabled
        variant="outlined"
        sx={{ mb: 2 }}
        size="large"
        fullWidth
        endIcon={<ArrowForwardIosIcon />}>
        Prebuilt Template
      </Button>
      <Button
        onClick={SelectHandler('ProjectForm')}
        variant="outlined"
        size="large"
        fullWidth
        endIcon={<ArrowForwardIosIcon />}>
        Start from scratch
      </Button>
    </Paper>
  );
};

export default SelectOption;
