import NavigationBar from '@/components/NavigationBar';
import SwmsTable from '@/components/Swms/SwmsTable';
import { HomePageLayoutProps } from '@/types/Layout';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FC } from 'react';

const HomePageLayout: FC<HomePageLayoutProps> = ({ organisation, swms }) => {
  const theme = useTheme();
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  return (
    <div>
      <NavigationBar />
      <Box
        sx={{
          position: 'absolute',
          right: '0',
          top: '0',
          width: '100%',
          height: '100%',
          zIndex: -1,
          overflow: 'hidden'
        }}>
        <Box
          sx={{
            marginTop: '60px',
            backgroundColor: isDarkMode ? theme.palette.grey[900] : theme.palette.grey[200],
            height: '100%'
          }}>
          <Box
            sx={{
              p: 10
            }}>
            <Typography sx={{ mb: 2 }} variant="h4">
              {organisation?.name}
            </Typography>
            <SwmsTable swms={swms} />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default HomePageLayout;
