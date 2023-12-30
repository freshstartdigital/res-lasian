import { Box, Button, Typography } from '@mui/material';
import React, { FC, Fragment, SyntheticEvent, useState } from 'react';
import InputText from '../Input/InputText';
import InputDate from '../Input/InputDate';
import { CreateLayoutProps } from '@/types/Layout';
import InputTable from '../Input/InputTable';
import { FORM_DATA, FORM_CONFIG } from '@/config/Form';
import { useRouter } from 'next/router';

const ProjectForm: FC<CreateLayoutProps> = (props) => {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<any>({});
  const [tableData, setTableData] = useState<any>(Array.isArray(props.schema) ? props.schema : []);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const router = useRouter();
  const changeHandler = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [field]: e.target.value });
  };

  console.log(props);

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

    console.log(filteredTableData);

    // setStep(step + 1);
    setIsLoaded(true);
    const res = await fetch('/api/pdf', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        organisationID: props.organisation?.id,
        account_email: props.user?.email,
        name: input.siteName,
        swms_type: 'Construction',
        swms_data: {
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
        }
      })
    });

    const data = await res.json();
    setIsLoaded(false);
    router.push(`/`);
  };
  return (
    <Box
      component="form"
      onSubmit={submitHandler}
      sx={{ width: '600px', marginTop: '5vh', height: '100%' }}>
      <Typography variant="h5">Project Information</Typography>
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
        Array.isArray(props.schema) &&
        props.schema.map((Element) => {
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
          alignItems: 'flex-start',
          gap: 2,
          height: '150px'
        }}>
        <Button sx={{ width: 150 }} variant="outlined">
          Cancel
        </Button>
        <Button disabled={isLoaded} type="submit" sx={{ width: 150 }} variant="contained">
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectForm;
