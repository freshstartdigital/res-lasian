import { Swms } from '@/types/schema';
import { Card } from '@mui/material';
import React, { FC } from 'react';

type SwmsTableProps = {
  swms: Swms[];
};

const SwmsTable: FC<SwmsTableProps> = ({ swms }) => {
  return (
    <div>
      <Card sx={{ p: 2 }}>
        {Array.isArray(swms) &&
          swms.map((swms: Swms) => {
            console.log(swms);
            return (
              <div key={swms.id}>
                <h1>{swms.name}</h1>
                <p>{swms.swms_type}</p>
              </div>
            );
          })}
      </Card>
    </div>
  );
};

export default SwmsTable;
