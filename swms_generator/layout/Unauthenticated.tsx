import { Box, Button, Paper, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import React from 'react';

const Unauthenticated = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        right: '0',
        top: '0',
        width: '100%',
        height: '100%',
        zIndex: -1
      }}>
      <Paper
        sx={{
          p: 10,
          m: 10
        }}>
        <Typography variant="h4">Welcome to SWMS Generator</Typography>
        <Typography variant="body1">Please sign in to continue</Typography>
        <Button variant="contained" onClick={() => signIn()}>
          Sign in
        </Button>
      </Paper>
    </Box>
  );
};

export default Unauthenticated;
