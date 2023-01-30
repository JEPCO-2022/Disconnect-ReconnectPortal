// @mui
import React from 'react';
import { Card, Container, Divider, Grid, TextField, Typography } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import DataTable from './AllUsersTable';

// ----------------------------------------------------------------------

export default function AllUsersAndRoles() {
  const { themeStretch } = useSettings();
  const [searchTerm, setsearchTerm] = React.useState('');

  return (
    <Page title="المستخدمون والصلاحيات">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          المستخدمون والصلاحيات
        </Typography>
        <Card sx={{ display: 'flex', alignItems: 'center', p: 4, backgroundColor: '#EFEFEF' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
            المستخدمون والصلاحيات
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider light />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                fullWidth
                placeholder="ابحث عن مستخدم    "
                onChange={(event) => {
                  setsearchTerm(event.target.value);
                }}
              />
            </Grid>
          </Grid>
        </Card>
        <br/>
        <DataTable/>
      </Container>
    </Page>
  );
}
