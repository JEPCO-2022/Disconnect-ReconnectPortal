import { Helmet } from 'react-helmet-async';
// @mui
import { Link, Container, Typography, Divider, Stack, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import image from './logo-wide (1).png';
// hooks
import LoginForm from './LoginForm';
import useResponsive from '../../hooks/useResponsive';
// components
// import Logo from '../components/logo';
// import Iconify from '../components/iconify';
// sections
// import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  marginLeft: 'auto',
  marginRight: 'auto',
  // minHeight: '60vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title>تسجيل دخول</title>
      </Helmet>

      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Grid container direction="column" alignItems="center">
              {/* <img src={image} alt="Logo" className="m-4" /> */}
              <img width="250vh" src="/assets/illustrations/mainicon.svg" alt="Logo" />
              <Typography variant="h4" sx={{ px: 5, mt: 4 }}>
                بوابة الاستعلام عن تطبيق القطع والوصل
              </Typography>
            </Grid>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

/* <Typography variant="h6" gutterBottom>
              تسجيل دخول
            </Typography> */

/* <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <Link variant="subtitle2">Get started</Link>
            </Typography> */

/* <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack> */

/* <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider> */
