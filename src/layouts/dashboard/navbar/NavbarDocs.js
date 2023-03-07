// @mui
import { Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import cookie from 'react-cookies';
// import { DocIllustration } from '../../../assets';

// ----------------------------------------------------------------------

export default function NavbarDocs() {
  const navigate = useNavigate();
  async function HandleSubmit() {
    const userToken = await cookie.load('user');
    const userName = await cookie.load('userName');
    if (userToken && userName) {
      window.open('/login', '_self');
      // cookie.remove('user');
      // cookie.remove('userName');
      localStorage.removeItem('user');
      localStorage.removeItem('userName');
      // localStorage.clear();



      navigate(`/login`);
    }
  }
  return (
    <>
      <Stack spacing={3} sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}>
        {/* <DocIllustration sx={{ width: 1 }} /> */}

        {/* <Typography gutterBottom variant="subtitle1">
          Hi, Rayan Moran
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Need help?
          <br /> Please check our docs
        </Typography> */}
        <Button color="error" variant="contained" onClick={() => HandleSubmit()}>
          تسجيل خروج
        </Button>
      </Stack>
    </>
  );
}
