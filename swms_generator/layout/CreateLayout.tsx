import ProjectForm from '@/components/Create/ProjectForm';
import SelectOption from '@/components/Create/SelectOption';
import NavigationBar from '@/components/NavigationBar';
import { HomePageLayoutProps } from '@/types/Layout';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { FC, useState } from 'react';

const CreateLayout: FC<HomePageLayoutProps> = (props) => {
  const [component, setComponent] = useState('SelectOption' as string);
  const theme = useTheme();
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const SelectHandler = (Component: string) => () => {
    setComponent(Component);
  };

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
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {component == 'SelectOption' && <SelectOption SelectHandler={SelectHandler} />}
          {component == 'ProjectForm' && <ProjectForm {...props} />}
        </Box>
      </Box>
    </div>
  );
};

export default CreateLayout;
