import { SwmsWithPaths } from '@/types/Layout';
import { Swms } from '@/types/schema';
import { Card } from '@mui/material';
import React, { FC } from 'react';

type SwmsTableProps = {
  swms: SwmsWithPaths[];
};

const SwmsTable: FC<SwmsTableProps> = ({ swms }) => {
  return (
    <div>
      {Array.isArray(swms) &&
        swms.map((swms: SwmsWithPaths) => {
          console.log(swms);
          return (
            <Card sx={{ p: 2, display: 'flex', alignItems: 'center', mb: 2 }} key={swms.id}>
              <h1>{swms.name}</h1>
              <p>{swms.swms_type}</p>
              <a target="_blank" href={swms.url}>
                File
              </a>
            </Card>
          );
        })}
    </div>
  );
};

export default SwmsTable;
