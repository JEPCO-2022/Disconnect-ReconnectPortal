// @mui
import {
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

// hooks
import useSettings from '../hooks/useSettings';
// components
// import Page from '../components/Page'
import CustomizedTables from './Disconnection/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getBranchesLookup, getCitiesLookup } from 'src/Redux/Customer/CustomerAction';
import { useState } from 'react';
import { useEffect } from 'react';
// ----------------------------------------------------------------------

export default function PageFive() {
  const { themeStretch } = useSettings();
  const CitiesList = useSelector((state) => state.Customer.CitiesList);
  const BranchesList = useSelector((state) => state.Customer.BranchesList);
const dispatch =useDispatch();
  
  const [inputValues, setinputValues] = useState({
    City: '',
    Branch: '',
  });

  useEffect(() => {
    dispatch(getCitiesLookup());
    dispatch(getBranchesLookup());
  }, []);

  return (
    // <Page title="تقرير ال">قطع
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Typography variant="h3" component="h1" paragraph>
        تقرير القطع
      </Typography>

      <Card sx={{ display: 'flex', alignItems: 'center', p: 4, backgroundColor: '#EFEFEF' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            تقرير الوصل
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Divider light />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"> المحافظة</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="المحافظة"
                  value={inputValues.City}
                  onChange={(e) => {
                    setinputValues({ ...inputValues, City: e.target.value });
                  }}
                >
                  {CitiesList.map((t) => (
                    <MenuItem value={t.id}>{t.cityName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"> المكتب</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="المكتب"
                value={inputValues.Branch}
                onChange={(e) => {
                  setinputValues({ ...inputValues, Branch: e.target.value });
                }}              >
                  {BranchesList.map((t) => (
                    <MenuItem value={t.branchID}>{t.branchName}</MenuItem>
                  ))}{' '}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"> الفرقه</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="الفرقه"
                // value={inputValues.piorityID}
                // onChange={(e) => setinputValues({ ...inputValues, piorityID: e.target.value })}
              >
                  {CitiesList.map((t) => (
                    <MenuItem value={t.id}>{t.cityName}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} lg={6}/>

          <Grid item xs={12} md={6} lg={6}>
            <Button className="nxt-btn-12-grid" variant="contained" fullwidth>
              بحث
            </Button>
          </Grid>
        </Grid>
      </Card>
      <br />
      <Grid textAlign="end" item xs={12} md={6} lg={6}>
        <Button endIcon={<FileDownloadIcon />} className="nxt-btn-12-grid" variant="outlined" fullwidth>
          تنزيل
        </Button>
      </Grid>
      <br />

      <CustomizedTables />
    </Container>
    // </Page>
  );
}
