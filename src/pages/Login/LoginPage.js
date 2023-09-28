import { Helmet } from 'react-helmet-async';
// @mui
import { Link, Container, Typography, Divider, Stack, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import image from './logo-wide (1).png';
// hooks
import LoginForm from './LoginForm';
import useResponsive from '../../hooks/useResponsive';

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
