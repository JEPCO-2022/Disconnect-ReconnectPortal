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
// ----------------------------------------------------------------------

export default function PageFour() {
  const { themeStretch } = useSettings();

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
                  // value={inputValues.piorityID}
                  // onChange={(e) => setinputValues({ ...inputValues, piorityID: e.target.value })}
                >
                  <MenuItem value="">
                    <em>-</em>
                  </MenuItem>
                  <MenuItem value={'1'}>اربد</MenuItem>
                  <MenuItem value={'2'}> الزرقاء</MenuItem>
                  <MenuItem value={'3'}> عمان</MenuItem>
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
                  // value={inputValues.piorityID}
                  // onChange={(e) => setinputValues({ ...inputValues, piorityID: e.target.value })}
                >
                  <MenuItem value="">
                    <em>-</em>
                  </MenuItem>
                  <MenuItem value={'1'}>اربد</MenuItem>
                  <MenuItem value={'2'}> الزرقاء</MenuItem>
                  <MenuItem value={'3'}> عمان</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <LocalizationProvider  dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  
                  label="تاريخ التقرير"
                  inputFormat="MM/DD/YYYY"
                  // value={value}
                  // onChange={handleChange}
                  renderInput={(params) => <TextField sx={{width: '100%'}} {...params} />}
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
            <Button className="nxt-btn-12-grid" variant="contained" fullwidth >
              بحث
            </Button>
            </Grid>
          </Grid>
        </Card>
        <br/>
        <Grid textAlign='end' item xs={12} md={6} lg={6}>
        <Button  endIcon={<FileDownloadIcon />} className="nxt-btn-12-grid" variant="outlined" fullwidth >
              تنزيل
            </Button>
          </Grid>
        <br/>

<CustomizedTables/>
      </Container>
    </Page>
  );
}
