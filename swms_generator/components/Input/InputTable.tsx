import { Box, Checkbox, FormControlLabel, FormGroup, Paper, Typography } from '@mui/material';
import React, { FC, SyntheticEvent } from 'react';

type InputTableProps = {
  checkHandler: (
    id: number,
    subId: number
  ) => (event: SyntheticEvent<Element, Event>, checked: boolean) => void;
  data: any;
  value?: any;
  tableData: any[];
};

const InputTable: FC<InputTableProps> = ({ checkHandler, data, tableData }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom component="div">
        {data.name}
      </Typography>
      <Paper sx={{ px: 4, py: 2, mb: 2, width: '100%' }}>
        <FormGroup>
          {Array.isArray(data.values) &&
            data.values.map((e: any) => {
              return (
                <FormControlLabel
                  sx={{ mb: 2 }}
                  key={`${data.id}-${e.subId}`}
                  onChange={checkHandler(data.id, e.subId)}
                  control={
                    <Checkbox
                      checked={
                        Array.isArray(tableData) &&
                        tableData
                          .find((g) => g.id == data.id)
                          ?.values.find((f: any) => f.subId == e.sub)
                      }
                    />
                  }
                  label={Array.isArray(e.task) ? e.task.join(' / ') : e.task}
                />
              );
            })}
        </FormGroup>
      </Paper>
    </Box>
  );
};

export default InputTable;
