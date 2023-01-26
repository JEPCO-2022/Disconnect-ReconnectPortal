import { Container, Typography, Card, Grid, Divider, InputLabel, Box } from '@mui/material';
import React from 'react';
import logo from '../pic.jpg';
// import Maps from '../components/Maps';
import Mapsss from '../components/Mapsss';

export default function PageSeven() {
  return (
    <>
      <Container>
        <Card sx={{ display: 'flex', alignItems: 'center', p: 4, backgroundColor: '#EFEFEF' }}>
          <Typography variant="h4" component="h1" paragraph>
            المعلومات المرئية
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <InputLabel sx={{ display: 'inline' }}> اسم الفني : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                وسام عيسى حسن احمد
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <InputLabel sx={{ display: 'inline' }}> الفرقة : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                الفرقه رقم 111
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <InputLabel sx={{ display: 'inline' }}> رقم العداد : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                00045454541
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <InputLabel sx={{ display: 'inline' }}> رقم الملف : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                00045454541
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider light />
            </Grid>
          </Grid>
        </Card>
        <br />
        <br />
        <Card sx={{ display: 'flex', alignItems: 'center', p: 4, backgroundColor: '#EFEFEF' }}>
          <Typography variant="h4" paragraph>
            معلومات موقع العداد
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <InputLabel sx={{ display: 'inline' }}> المحافظة: </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                عمان
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <InputLabel sx={{ display: 'inline' }}> الشارع : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                شارع الشهيد فيصل
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <InputLabel sx={{ display: 'inline' }}> المصدر : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                وسام عيسى احمد
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <InputLabel sx={{ display: 'inline' }}> المنطقه : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                طارق
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <InputLabel sx={{ display: 'inline' }}> المعلم : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                طارق
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <InputLabel sx={{ display: 'inline' }}> الحي : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                حي الشهيد
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <InputLabel sx={{ display: 'inline' }}> رقم البناية : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                10
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <InputLabel sx={{ display: 'inline' }}> الخريطة : </InputLabel>
              {/* <Maps /> */}
              <Mapsss />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider light />
            </Grid>
          </Grid>
        </Card>
        <br />
        <br />
        <Card sx={{ display: 'flex', alignItems: 'center', p: 4, backgroundColor: '#EFEFEF' }}>
          <Typography variant="h4" component="h1" paragraph>
            تفاصيل الفصل
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <InputLabel sx={{ display: 'inline' }}> طريقة الفصل : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                وسام عيسى حسن احمد
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <InputLabel sx={{ display: 'inline' }}> تاريخ الفصل : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                22/11/1999
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <InputLabel sx={{ display: 'inline' }}> ملاحظه : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                00045454541
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <InputLabel> صوره : </InputLabel>
              <img src={logo} alt="images" />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider light />
            </Grid>
          </Grid>
        </Card>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Container>
        <Card sx={{ alignItems: 'center', p: 4, backgroundColor: '#EFEFEF' }}>
          <Box sx={{ backgroundColor: '#e6e6fa', padding: '16px' }}>
            <Typography variant="h4" component="h1" paragraph>
              المعلومات المرئية
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
                <InputLabel sx={{ display: 'inline' }}> اسم الفني : </InputLabel>
                <Typography sx={{ display: 'inline' }} paragraph>
                  وسام عيسى حسن احمد
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <InputLabel sx={{ display: 'inline' }}> الفرقة : </InputLabel>
                <Typography sx={{ display: 'inline' }} paragraph>
                  الفرقه رقم 111
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <InputLabel sx={{ display: 'inline' }}> رقم العداد : </InputLabel>
                <Typography sx={{ display: 'inline' }} paragraph>
                  00045454541
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <InputLabel sx={{ display: 'inline' }}> رقم الملف : </InputLabel>
                <Typography sx={{ display: 'inline' }} paragraph>
                  00045454541
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Divider light />
              </Grid>
            </Grid>
          </Box>
          <br />
          <br />
          <Box sx={{ backgroundColor: '#e6e6fa', padding: '16px' }}>
            <Typography variant="h4" component="h1" paragraph>
              معلومات موقع العداد
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
                <InputLabel sx={{ display: 'inline' }}> المحافظة: </InputLabel>
                <Typography sx={{ display: 'inline' }} paragraph>
                  عمان
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <InputLabel sx={{ display: 'inline' }}> الشارع : </InputLabel>
                <Typography sx={{ display: 'inline' }} paragraph>
                  شارع الشهيد فيصل
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <InputLabel sx={{ display: 'inline' }}> المصدر : </InputLabel>
                <Typography sx={{ display: 'inline' }} paragraph>
                  وسام عيسى احمد
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <InputLabel sx={{ display: 'inline' }}> المنطقه : </InputLabel>
                <Typography sx={{ display: 'inline' }} paragraph>
                  طارق
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <InputLabel sx={{ display: 'inline' }}> المعلم : </InputLabel>
                <Typography sx={{ display: 'inline' }} paragraph>
                  طارق
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <InputLabel sx={{ display: 'inline' }}> الحي : </InputLabel>
                <Typography sx={{ display: 'inline' }} paragraph>
                  حي الشهيد
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <InputLabel sx={{ display: 'inline' }}> رقم البناية : </InputLabel>
                <Typography sx={{ display: 'inline' }} paragraph>
                  10
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <InputLabel sx={{ display: 'inline' }}> الخريطه : </InputLabel>
                {/* <Maps /> */}
                <Mapsss />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Divider light />
              </Grid>
            </Grid>
          </Box>
          <br />
          <br />
          <Box sx={{ backgroundColor: '#e6e6fa', padding: '16px' }}>
            <Typography variant="h4" component="h1" paragraph>
              تفاصيل الفصل
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
                <InputLabel sx={{ display: 'inline' }}> طريقة الفصل : </InputLabel>
                <Typography sx={{ display: 'inline' }} paragraph>
                  وسام عيسى حسن احمد
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <InputLabel sx={{ display: 'inline' }}> تاريخ الفصل : </InputLabel>
                <Typography sx={{ display: 'inline' }} paragraph>
                  22/11/1999
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <InputLabel sx={{ display: 'inline' }}> ملاحظه : </InputLabel>
                <Typography sx={{ display: 'inline' }} paragraph>
                  00045454541
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <InputLabel sx={{ display: 'inline' }}> صوره : </InputLabel>
                <img src={logo} alt="images" />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Divider light />
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Container>
    </>
  );
}
