import { Box, Button, Typography } from '@mui/material';
import React, { FC, Fragment, SyntheticEvent, useState } from 'react';
import InputText from '../Input/InputText';
import InputDate from '../Input/InputDate';
import { HomePageLayoutProps } from '@/types/Layout';
import InputTable from '../Input/InputTable';
import { FORM_DATA, FORM_CONFIG, SWMS_TABLE_DATA } from '@/config/Form';

const ProjectForm: FC<HomePageLayoutProps> = (props) => {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<any>({});
  const [tableData, setTableData] = useState<any>(SWMS_TABLE_DATA);
  console.log('tableData', tableData);
  const changeHandler = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [field]: e.target.value });
  };

  const checkHandler =
    (id: number, subId: number) => (e: SyntheticEvent<Element, Event>, checked: boolean) => {
      if (checked) {
        setTableData((prev: any) => {
          const idIndex = prev.findIndex((e: any) => e.id == id);
          const subIdIndex = prev[idIndex].values.findIndex((e: any) => e.subId == subId);
          prev[idIndex].values[subIdIndex].checked = checked;

          return prev;
        });
      }
      if (!checked) {
        setTableData((prev: any) => {
          const idIndex = prev.findIndex((e: any) => e.id == id);
          const subIdIndex = prev[idIndex].values.findIndex((e: any) => e.subId == subId);
          prev[idIndex].values[subIdIndex].checked = checked;

          return prev;
        });
      }
    };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step === 0) {
      setStep(step + 1);
      return;
    }

    const filteredTableData = [];

    for (let data in tableData) {
      const subTableValue = [];

      for (const subData in tableData[data].values) {
        if (tableData[data].values[subData].checked) {
          subTableValue.push({
            ...tableData[data].values[subData],
            index: `${parseInt(data) + 1}.${parseInt(subData) + 1}`
          });
        }
      }

      if (subTableValue.length > 0) {
        tableData[data].values = subTableValue;
        filteredTableData.push({ ...tableData[data], index: parseInt(data) + 1 });
      }
    }

    // setStep(step + 1);
    const res = await fetch('/api/pdf', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        companyName: props.organisation?.name,
        businessName: props.organisation?.name,
        businessAddress: props.organisation?.address,
        abn: '98 765 432 109',
        businessPhone: '+61 2 1234 5678',
        scopeOfWork: 'New residential building construction',
        projectAddress: input.siteName,
        developedBy: 'John Doe',
        dateDeveloped: input.dateDeveloped,
        approvedBy: 'Jane Smith',
        approvalDate: input.approvalDate,
        name: 'this is a test',
        email: props.user?.email,
        nextReviewDate: input.nextReviewDate,
        tableData: filteredTableData
      })
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <Box component="form" onSubmit={submitHandler} sx={{ width: '600px' }}>
      <Typography variant="h6">Project Information</Typography>
      {step == 0 &&
        FORM_DATA.map((e) => {
          return (
            <Fragment key={e.label}>
              {e.type == 'text' && (
                <InputText
                  value={input[e.field]}
                  changeHandler={changeHandler}
                  field={e.field}
                  label={e.label}
                />
              )}
              {e.type == 'date' && (
                <InputDate
                  value={input[e.field]}
                  label={e.label}
                  field={e.field}
                  changeHandler={changeHandler}
                />
              )}
            </Fragment>
          );
        })}
      {step > 0 &&
        SWMS_TABLE_DATA.map((Element) => {
          return (
            <InputTable
              tableData={tableData}
              key={Element.id}
              data={Element}
              checkHandler={checkHandler}
            />
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
