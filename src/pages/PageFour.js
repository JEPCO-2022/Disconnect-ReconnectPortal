// @mui
import {
  Button,
  Card,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Radio from '@mui/material/Radio';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import CustomizedTables from './Reconnection/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getBranchesLookup, getCitiesLookup } from 'src/Redux/Customer/CustomerAction';
import { useEffect } from 'react';
// ----------------------------------------------------------------------

export default function PageFour() {
  const { themeStretch } = useSettings();
  const CitiesList = useSelector((state) => state.Customer.CitiesList);
  const BranchesList = useSelector((state) => state.Customer.BranchesList);

  const dispatch = useDispatch();

  const [inputValues, setinputValues] = useState({
    City: '',
    Branch: '',
  });

  useEffect(() => {
    dispatch(getCitiesLookup());
    dispatch(getBranchesLookup());
  }, []);

  return (
    <Page title="تقرير الوصل">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          تقرير الوصل
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
                  }}
                >
                  {BranchesList.map((t) => (
                    <MenuItem value={t.branchID}>{t.branchName}</MenuItem>
                  ))}{' '}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="تاريخ التقرير"
                  inputFormat="MM/DD/YYYY"
                  // value={value}
                  // onChange={handleChange}
                  renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <FormLabel id="demo-row-radio-buttons-group-label">نوع الكشف:</FormLabel>
              <FormGroup row>
                <FormControlLabel value="female" control={<Radio />} label="كشف فصل" />
                <FormControlLabel value="male" control={<Radio />} label="كشف قطع" />
              </FormGroup>
            </Grid>
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
    </Page>
  );
}
