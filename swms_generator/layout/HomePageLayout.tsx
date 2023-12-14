import NavigationBar from '@/components/NavigationBar';
import { HomePageLayoutProps } from '@/types/Layout';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FC } from 'react';

// export default function Component() {
//   const { data: session } = useSession()
//   if (session) {
//     return (
//       <>
//         Signed in as {session?.user?.email} <br />
//         <button onClick={() => signOut()}>Sign out</button>
//       </>
//     )
//   }
//   return (
//     <>
//       Not signed in <br />
//       <button onClick={() => signIn()}>Sign in</button>
//     </>
//   )
// }

const HomePageLayout: FC<HomePageLayoutProps> = ({ organisation }) => {
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
            <Typography variant="h4">{organisation?.name}</Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default HomePageLayout;
