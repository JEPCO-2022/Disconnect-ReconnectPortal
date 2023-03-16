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
  function telephonChecked(phoneNumber) {
    if (phoneNumber === undefined || phoneNumber === '')
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
          {phoneNumber}
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
  function governateNameChecked(governateName) {
    if (governateName === undefined || governateName === '')
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
          {governateName}
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
  function districtNameChecked(districtName) {
    if (districtName === undefined || districtName === '')
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
          {districtName}
        </Typography>
      </>
    );
  }
  function zoneNameChecked(zoneName) {
    if (zoneName === undefined || zoneName === '')
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
          {zoneName}
        </Typography>
      </>
    );
  }
  function streetNameChecked(streetName) {
    if (streetName === undefined || streetName === '')
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
          {streetName}
        </Typography>
      </>
    );
  }
  function buildingNumberChecked(buildingNumber) {
    if (buildingNumber === undefined || buildingNumber === '')
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
          {buildingNumber}
        </Typography>
      </>
    );
  }
  function sourceTypeChecked(sourceType) {
    if (sourceType === undefined || sourceType === '')
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
          {sourceType}
        </Typography>
      </>
    );
  }
  function nearestLandmarkChecked(nearestLandmark) {
    if (nearestLandmark === undefined || nearestLandmark === '')
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
          {nearestLandmark}
        </Typography>
      </>
    );
  }
  function mapChecked(xPosition, yPostion) {
    if (xPosition === undefined || xPosition === '')
      return (
        <>
          <Typography sx={{ display: 'inline' }} paragraph>
            لا يوجد موقع
          </Typography>
        </>
      );
    return (
      <>
        <Map lang={xPosition} latt={yPostion} />
      </>
    );
  }

  function disconnectionMethodChecked(disconnectionMethod) {
    if (disconnectionMethod === undefined || disconnectionMethod === '')
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
          {disconnectionMethod}
        </Typography>
      </>
    );
  }
  function noteChecked(note) {
    if (note === undefined || note === '')
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
          {note}
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
                {telephonChecked(data.teL_NUMBER)}
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
                {governateNameChecked(data.governateName)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> المنطقه : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                {districtNameChecked(data.districtName)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> الحي : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                {zoneNameChecked(data.zoneName)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> المعلم : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                {nearestLandmarkChecked(data.nearestLandmark)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> الشارع : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                {streetNameChecked(data.streetName)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> رقم البناية : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                {buildingNumberChecked(data.buildingNumber)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: 'inline' }}> المصدر : </InputLabel>
              <Typography sx={{ display: 'inline' }} paragraph>
                {sourceTypeChecked(data.sourceType)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <InputLabel sx={{ display: 'inline' }}> الخريطه : </InputLabel>
              {mapChecked(data.x_POSITION, data.y_POSITION)}
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
                {disconnectionMethodChecked(data.disconnectionMethod)}
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
                {noteChecked(data.note)}
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
