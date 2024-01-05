import { SwmsWithPaths } from '@/types/Layout';
import { Swms } from '@/types/schema';
import { Box, Card, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

type SwmsTableProps = {
  swms: SwmsWithPaths[];
};

const SwmsTable: FC<SwmsTableProps> = ({ swms }) => {
  const router = useRouter();
  useEffect(() => {
    const unloadedSwms = swms.filter((swms) => !swms.file_name);

    if (unloadedSwms.length > 0) {
      const timer = setTimeout(() => {
        console.log('refreshing');
        router.push(router.asPath);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);
  return (
    <div>
      {Array.isArray(swms) &&
        swms.map((swms: SwmsWithPaths) => {
          return (
            <Card sx={{ p: 2, display: 'flex', alignItems: 'center', mb: 2 }} key={swms.id}>
              <Box
                sx={{
                  flex: 1
                }}>
                <Typography>{swms.name}</Typography>
              </Box>
              <Box sx={{ width: '150px' }}>
                <Typography>{swms.swms_type}</Typography>
              </Box>
              <Box sx={{ width: '150px' }}>
                {swms.file_name ? (
                  <a target="_blank" href={swms.url}>
                    File
                  </a>
                ) : (
                  <Box>
                    <CircularProgress />
                  </Box>
                )}
              </Box>
            </Card>
          );
        })}
    </div>
  );
};

export default SwmsTable;
