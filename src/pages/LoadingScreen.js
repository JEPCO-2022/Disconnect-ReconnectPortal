import { Box } from '@mui/material';
import React from 'react';
import ReactLoading from 'react-loading';

export default function LoadingScreen() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          marginTop: 220,
          //   alignItems: 'center',
          //   justifyContent: 'center',
          minHeight: '100vh',
          marginRight: '45%',
        }}
      >
        <Box>
          <ReactLoading type="spin" color="#0000FF" height={100} width={50} />
        </Box>
      </div>
    </>
  );
}
