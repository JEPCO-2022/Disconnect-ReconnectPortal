import { useState, useEffect, useRef } from 'react';
// @mui
import ExcelJS from 'exceljs';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import {
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Radio from '@mui/material/Radio';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { read, utils, writeFile } from 'xlsx';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  clearPersistedState,
  getBranchesLookupAllBranches,
  getCitiesLookupAllCities,
  getTeamsLookup,
  StatusOfDisconnectionTicketsReport,
} from '../Redux/Customer/CustomerAction';
import SessionTimeout from './SessionTimeout';
import useSettings from '../hooks/useSettings';
import '../index.css';
// components
import Page from '../components/Page';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#2065D1',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CountersClips = () => {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = localStorage.getItem('isAdmin');
  const userName = localStorage.getItem('userName');
  const Status = [{ name: 'مدفوع' }, { name: 'غير مدفوع' }];
  const CitiesList = useSelector((state) => state.Customer.CitiesList);
  const BranchesList = useSelector((state) => state.Customer.BranchesList);
  const TeamsList = useSelector((state) => state.Customer.TeamList);
  const ReportTickets = useSelector((state) => state.Customer.StatusOfDisconnectionTickets);
  const separator = '';
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const [inputValues, setinputValues] = useState({
    City: '',
    Branch: '',
    Team: '',
    Status: '',
    startDate: `${year}${separator}-${month < 10 ? `0${month}` : `${month}`}-${separator}${date}`,
    endDate: `${year}${separator}-${month < 10 ? `0${month}` : `${month}`}-${separator}${date}`,
  });

  const [errorMessageCity, setErrorMessageCity] = useState('');
  const [errorMessageBranch, setErrorMessageBranch] = useState('');
  const [errorMessageTeam, setErrorMessageTeam] = useState('');
  const [errorMessageStatus, setErrorMessageStatus] = useState('');
  const [flagCity, setflagCity] = useState(false);
  const [flagBranch, setflagBranch] = useState(false);
  const [flagTeam, setflagTeam] = useState(false);
  const [flagStatus, setflagStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabledBranch, setDisabledBranch] = useState(false);
  const [disabledTeam, setDisabledTeam] = useState(false);
  const [hiddenBranch, setHiddenBranch] = useState(true);
  const isLogged = localStorage.getItem('isLogged');

  useEffect(() => {
    if (!(isLogged === 'true')) {
      localStorage.removeItem('user');
      localStorage.removeItem('userName');
      localStorage.removeItem('isAdmin');
      navigate('/login');
    }
    dispatch(clearPersistedState());
    dispatch(getCitiesLookupAllCities());
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [ReportTickets]);

  function callBranchLookup(cityID) {
    setinputValues({ ...inputValues, City: cityID, Branch: '', Team: '' });
    setDisabledBranch(false);
    setHiddenBranch(true);
    if (cityID === 99) {
      setDisabledBranch(true);
      setHiddenBranch(false);
      return false;
    }
    const isAdminBoolean = isAdmin === 'true';
    dispatch(getBranchesLookupAllBranches(cityID, userName, isAdminBoolean));
    setErrorMessageCity('');
    setflagCity(false);
  }
  function callTeamLookup(branchId) {
    setinputValues({ ...inputValues, Branch: branchId, Team: '' });
    dispatch(getTeamsLookup(branchId));
    setErrorMessageBranch('');
    setflagBranch(false);
    setflagStatus(false);
  }
  function statusSetData(e) {
    setinputValues({ ...inputValues, Status: e });
    setErrorMessageStatus('');
    setflagStatus(false);
  }
  function teamSetData(e) {
    setinputValues({ ...inputValues, Team: e });
    setErrorMessageTeam('');
    setflagTeam(false);
  }
  const handleTab = (e) => {
    const cityNumber = `${inputValues.City}`;
    const officeNumber = `${inputValues.Branch}`;
    const isAdminBoolean = isAdmin === 'true';
    const dateFrom = moment(inputValues.startDate.$d).format('YYYY-MM-DD');
    const dateTo = moment(inputValues.endDate.$d).format('YYYY-MM-DD');
    let statusCode = '';
    switch (inputValues.Status) {
      case 'مدفوع':
        statusCode = '1';
        break;
      case 'غير مدفوع':
        statusCode = '2';
        break;
      case undefined:
        statusCode = '';
        break;

      default:
        break;
    }
    if (inputValues.City === 99) {
      dispatch(
        StatusOfDisconnectionTicketsReport(dateFrom, dateTo, 'ALL', 'ALL', userName, isAdminBoolean, statusCode)
      );
      setErrorMessageBranch('');
      setflagBranch(false);
      setLoading(true);
      return false;
    }

    if (inputValues.Branch === 0) {
      dispatch(
        StatusOfDisconnectionTicketsReport(dateFrom, dateTo, cityNumber, 'ALL', userName, isAdminBoolean, statusCode)
      );

      setLoading(true);
      return false;
    }

    if (inputValues.City === '') {
      setErrorMessageCity('مطلوب');
      setflagCity(true);
    }
    if (inputValues.Branch === '') {
      setErrorMessageBranch('مطلوب');
      setflagBranch(true);
      return 0;
    }

    dispatch(
      StatusOfDisconnectionTicketsReport(
        dateFrom,
        dateTo,
        cityNumber,
        officeNumber,
        userName,
        isAdminBoolean,
        statusCode
      )
    );
    setLoading(true);
  };
  function chekedPhoneNumber(phoneNumber) {
    if (phoneNumber === undefined || phoneNumber === '') return 'لا يوجد';
    return phoneNumber;
  }
  function chekedConnectionDate(date) {
    if (date === undefined || date === '') return '-';
    return moment(date.$d).format('YYYY-MM-DD');
  }
  const exportToExcel = (apiData, fileName) => {
    const customHeadings = apiData.reduce((acc, curr) => {
      const _users = acc;
      return [
        ..._users,
        {
          teamNum: curr.teaM_NO,
          meterNum: curr.meter_NO,
          customName: curr.cusT_Name,
          closeDate: moment(curr.closeDate$d).format('YYYY-MM-DD'),
          connectionDate: chekedConnectionDate(curr.connectionDate),
          phoneNumber: chekedPhoneNumber(curr.teL_NUMBER),
          status: curr.status,
        },
      ];
    }, []);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1', {
      pageSetup: {
        orientation: 'landscape',
        fitToPage: true,
        fitToHeight: 5,
        fitToWidth: 7,
        paperSize: 9,
      },
    });
    worksheet.addRow([fileName]);
    worksheet.addRow([
      ' رقم الفرقة',
      ' رقم العداد ',
      ' اسم المشترك ',
      ' تاريخ الفصل ',
      ' تاريخ طلب وصل التيار ',
      ' رقم الهاتف ',
      ' الحالة ',
    ]);
    customHeadings.map((e) =>
      worksheet.addRow([e.teamNum, e.meterNum, e.customName, e.closeDate, e.connectionDate, e.phoneNumber, e.status])
    );
    worksheet.columns[0].width = 10;
    worksheet.columns[1].width = 20;
    worksheet.columns[2].width = 35;
    worksheet.columns[3].width = 20;
    worksheet.columns[4].width = 20;
    worksheet.columns[5].width = 25;
    worksheet.columns[6].width = 10;
    worksheet.mergeCells('A1:G1');
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      });
    });
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.xlsx`;
      a.click();
    });
  };
  return (
    <>
      <Page title="تقارير العدادات المفصولة">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 4, backgroundColor: '#EFEFEF' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
                <Typography variant="h4" component="h1" paragraph>
                  تقارير العدادات المفصولة
                </Typography>
                <Divider light />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label=" من تاريخ"
                    inputFormat="DD/MM/YYYY"
                    value={inputValues.startDate}
                    maxDate={inputValues.endDate ? inputValues.endDate : new Date()}
                    onChange={(e) => {
                      setinputValues({ ...inputValues, startDate: e });
                    }}
                    renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="الى تاريخ"
                    inputFormat="DD/MM/YYYY"
                    value={inputValues.endDate}
                    minDate={inputValues.startDate}
                    maxDate={new Date()}
                    onChange={(e) => {
                      setinputValues({ ...inputValues, endDate: e });
                    }}
                    renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                  />
                </LocalizationProvider>
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
                      callBranchLookup(e.target.value);
                    }}
                    helperText={flagCity ? ' مطلوب' : ''}
                    error={flagCity}
                  >
                    {CitiesList.map((t) => (
                      <MenuItem value={t.id}>{t.cityName}</MenuItem>
                    ))}
                  </Select>
                  <h4 className="errorMessage">{errorMessageCity}</h4>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={6} className={hiddenBranch ? 'visible' : 'hidden-div'}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label"> المكتب</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="المكتب"
                    value={inputValues.Branch}
                    onChange={(e) => {
                      callTeamLookup(e.target.value);
                    }}
                    inputProps={{ readOnly: disabledBranch }}
                    helperText={flagBranch ? ' مطلوب' : ''}
                    error={flagBranch}
                  >
                    {BranchesList.map((t) => (
                      <MenuItem value={t.branchID}>{t.branchName}</MenuItem>
                    ))}
                  </Select>
                  <h4 className="errorMessage">{errorMessageBranch}</h4>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label"> الحالة</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="الحالة"
                    value={inputValues.Status}
                    onChange={(e) => {
                      statusSetData(e.target.value);
                    }}
                  >
                    <MenuItem value="">
                      <em> الجميع </em>
                    </MenuItem>
                    {Status.map((t) => (
                      <MenuItem value={t.name}>{t.name}</MenuItem>
                    ))}
                  </Select>
                  {/* <h4 className="errorMessage">{errorMessageStatus}</h4> */}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Button
                  className="nxt-btn-12-grid"
                  variant="contained"
                  fullwidth
                  onClick={() => handleTab(1)}
                  endIcon={loading && <CircularProgress size={20} color="inherit" />}
                >
                  بحث
                </Button>
              </Grid>
            </Grid>
          </Card>

          <br />

          <br />
          {ReportTickets?.length > 0 ? (
            <>
              <Grid textAlign="end" item xs={12} md={6} lg={6}>
                <Button
                  endIcon={<FileDownloadIcon />}
                  variant="outlined"
                  onClick={() => {
                    exportToExcel(ReportTickets, ' تقارير العدات المفصولة ');
                  }}
                  fullwidth
                >
                  تنزيل
                </Button>
              </Grid>
              <br />
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>رقم الفرقة</StyledTableCell>
                      <StyledTableCell align="center">رقم العداد </StyledTableCell>
                      <StyledTableCell align="center">اسم المشترك </StyledTableCell>
                      <StyledTableCell align="center"> تاريخ الفصل </StyledTableCell>
                      <StyledTableCell align="center"> تاريخ طلب وصل التيار </StyledTableCell>
                      <StyledTableCell align="center">رقم الهاتف </StyledTableCell>
                      <StyledTableCell align="center"> الحالة </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ReportTickets.map((ticket) => (
                      <StyledTableRow key={ticket.id}>
                        <StyledTableCell component="th" scope="row">
                          {ticket.teaM_NO}
                        </StyledTableCell>
                        <StyledTableCell align="center">{ticket.meter_NO}</StyledTableCell>
                        <StyledTableCell align="center">{ticket.cusT_Name}</StyledTableCell>
                        <StyledTableCell align="center">
                          {moment(ticket.closeDate$d).format('YYYY-MM-DD')}
                        </StyledTableCell>
                        <StyledTableCell align="center">{chekedConnectionDate(ticket.connectionDate)}</StyledTableCell>
                        <StyledTableCell align="center">{chekedPhoneNumber(ticket.teL_NUMBER)}</StyledTableCell>
                        <StyledTableCell align="center">{ticket.status}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <>
              <Grid textAlign="end" item xs={12} md={6} lg={6}>
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: 'auto', marginTop: '5vh' }}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Typography variant="h5" component="h1" paragraph>
                      لا يوجد
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
            </>
          )}
        </Container>
      </Page>
      <SessionTimeout />
    </>
  );
};

export default CountersClips;
