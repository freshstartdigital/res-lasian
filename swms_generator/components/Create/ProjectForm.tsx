import { Box, Button, Typography } from '@mui/material';
import React, { FC, Fragment, useState } from 'react';
import InputText from '../Input/InputText';
import InputDate from '../Input/InputDate';
import { HomePageLayoutProps } from '@/types/Layout';

const FORM_DATA = [
  { label: 'Site Name', type: 'text', step: 0, field: 'siteName' },
  { label: 'Date Developed', type: 'date', step: 0, field: 'dateDeveloped' },
  { label: 'Approval Date', type: 'date', step: 0, field: 'approvalDate' },
  { label: 'Date Last Reviewed', type: 'date', step: 0, field: 'dateLastReviewed' },
  { label: 'Next Review Date', type: 'date', step: 0, field: 'nextReviewDate' }
];

const ProjectForm: FC<HomePageLayoutProps> = (props) => {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<any>({});
  console.log(props);

  const changeHandler = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [field]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        tableData: [
          {
            number: '1',
            task: 'Unload vehicle',
            potentialHazards: 'Musculoskeletal strains',
            riskBefore: '3',
            controlMeasures: 'Planning, Consultation, Adherence to Manual Handling Techniques',
            controlMeasuresList: [
              'When unloading the vehicle we will ensure that we are as close as possible to the area where the equipment will be set up. If required we will seek out assistance in unloading heavy items, however our normal work does not include heavy items.',
              'We will use sensible manual handling techniques making sure our backs are straight and bending with the knees.'
            ],
            riskAfter: '5'
          }
        ]
      })
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <Box component="form" onSubmit={submitHandler} sx={{ width: '600px' }}>
      <Typography variant="h6">Project Information</Typography>
      {FORM_DATA.filter((e) => e.step == step).map(({ label, type, field }) => {
        return (
          <Fragment key={label}>
            {type === 'text' && (
              <InputText
                value={input[field]}
                changeHandler={changeHandler}
                field={field}
                label={label}
              />
            )}
            {type === 'date' && (
              <InputDate
                value={input[field]}
                label={label}
                field={field}
                changeHandler={changeHandler}
              />
            )}
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
