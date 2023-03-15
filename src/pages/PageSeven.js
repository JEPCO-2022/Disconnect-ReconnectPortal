import React, { useEffect } from 'react';
import { Container, Typography, Card, Grid, Divider, InputLabel, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { getTicketsDetails } from '../Redux/Customer/CustomerAction';
import Map from '../components/Map';
import '../index.css';

export default function PageSeven() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Customer.TicketsData);
  const location = useLocation();
  const id = location.state.ticketID;
  const idString = id.toString();
  const teamNumber = location.state.teamNumber;
  const customName = location.state.customName;
  const fileNumber = location.state.fileNumber;
  const meterNumber = location.state.meterNumber;
  const date = String(data.closeDate).split('T');
  const days = String(date[0]);
  const timeSecond = String(date[1]);
  const timeMinutes = String(timeSecond).split(':');
  const time = `  ${timeMinutes[1]}: ${timeMinutes[0]}`;
  useEffect(() => {
    console.log(id);
    dispatch(getTicketsDetails(id));
  }, []);
  function showImage(srcImage) {
    const sourceImage = srcImage;
    if (!(srcImage === undefined || srcImage === '')) {
      return (
        <>
          <InputLabel sx={{ display: 'inline' }}> صوره : </InputLabel>
          <img src={`data:image/jpeg;base64,${sourceImage}`} alt="images" className="zoom" />
        </>
      );
    }
    return (
      <>
        <Typography variant="h3" component="h1" paragraph align="center">
          لا يوجد صوره
        </Typography>
      </>
    );
  }
  function daysChecked(days) {
    if (days === 'undefined' || days === '')
      return (
        <>
          <Typography sx={{ display: 'inline' }} paragraph>
            لا يوجد
          </Typography>
        </>
      );
    return (
      <>
        <Typography sx={{ display: 'inline' }} paragraph>
          {days}
        </Typography>
      </>
    );
  }
  function timeChecked(time) {
    if (time === '  undefined: undefined' || time === '')
      return (
        <>
          <Typography sx={{ display: 'inline' }} paragraph>
            لا يوجد
          </Typography>
        </>
      );
    return (
      <>
        <Typography sx={{ display: 'inline' }} paragraph>
          {time}
        </Typography>
      </>
    );
  }

  return (
    <>
      <Container>
        <Card sx={{ alignItems: 'center', p: 4, backgroundColor: '#EFEFEF' }}>
          <Typography variant="h4" component="h1" paragraph>
            المعلومات الرئيسية
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> اسم الفني : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                {data.technicalFullName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> اسم المشترك : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                {customName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> الفرقة : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                {teamNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> رقم العداد : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                {meterNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> رقم الملف : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                {fileNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> رقم الهاتف : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                {data.teL_NUMBER}
              </Typography>
            </Grid>
          </Grid>
          <br />
          <br />
          <Typography variant="h4" component="h1" paragraph>
            معلومات موقع العداد
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> المحافظة: </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                {data.governateName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> المنطقه : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                {data.districtName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> الحي : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                {data.zoneName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> المعلم : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                {data.nearestLandmark}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> الشارع : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                {data.streetName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> رقم البناية : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                {data.buildingNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> المصدر : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                {data.sourceType}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <InputLabel sx={{ display: 'inline' }}> الخريطه : </InputLabel>
              <Map lang={data.x_POSITION} latt={data.y_POSITION} />
            </Grid>
          </Grid>
          <br />
          <br />
          <Typography variant="h4" component="h1" paragraph>
            تفاصيل الفصل
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> طريقة الفصل : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                {data.disconnectionMethod}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> تاريخ الفصل : </InputLabel>
              {daysChecked(days)}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> وقت الفصل : </InputLabel>
              {timeChecked(time)}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> ملاحظه : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                {data.note}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider light />
            </Grid>
            <Grid item xs={12} md={12} lg={12} sx={{ marginTop: 2 }}>
              {showImage(data.disconnectionImage)}
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Button
                className="nxt-btn-12-grid"
                variant="contained"
                fullwidth
                onClick={() => navigate(`/dashboard/user/detailsbyteam`)}
              >
                رجوع
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
