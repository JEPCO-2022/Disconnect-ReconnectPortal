import { useState, useEffect, useRef } from 'react';
// @mui
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import ExcelJS from 'exceljs';
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
import '../index.css';
// hooks
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import {
  getCitiesLookupAllCities,
  getBranchesLookupAllBranches,
  getTeamInfo,
  clearPersistedState,
} from '../Redux/Customer/CustomerAction';
import useSettings from '../hooks/useSettings';
import SessionTimeout from './SessionTimeout';
// components
import Page from '../components/Page';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';

// ----------------------------------------------------------------------
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
export default function PageFour() {
  const { themeStretch } = useSettings();
  const CitiesList = useSelector((state) => state.Customer.CitiesList);
  const BranchesList = useSelector((state) => state.Customer.BranchesList);
  const TeamList = useSelector((state) => state.Customer.TeamInfo);
  const clearAll = useSelector((state) => state.Customer.clearAll);
  const isLogged = localStorage.getItem('isLogged');
  const isAdmin = localStorage.getItem('isAdmin');
  const userName = localStorage.getItem('userName');
  const canExport = localStorage.getItem('canExport');
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const separator = '';
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const [flagFullName, setflagFullName] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessageCity, setErrorMessageCity] = useState('');
  const [errorMessageBranch, setErrorMessageBranch] = useState('');
  const [disabledBranch, setDisabledBranch] = useState(false);
  const [hiddenBranch, setHiddenBranch] = useState(true);
  const navigate = useNavigate();
  const [inputValues, setinputValues] = useState({
    City: '',
    Branch: '',
    startDate: `${year}${separator}-${month < 10 ? `0${month}` : `${month}`}-${separator}${date}`,
    endDate: `${year}${separator}-${month < 10 ? `0${month}` : `${month}`}-${separator}${date}`,
  });
  const [valueRDG, setValueRBG] = useState('1');
  function callBranchLookup(cityID) {
    setDisabledBranch(false);
    setHiddenBranch(true);
    if (cityID === 99) {
      setHiddenBranch(false);
      setDisabledBranch(true);
      return false;
    }
    const isAdminBoolean = isAdmin === 'true';
    dispatch(getBranchesLookupAllBranches(cityID, userName, isAdminBoolean));
  }
  const handleChangeRadioGroup = (event) => {
    setValueRBG(event.target.value);
    TeamList.length = 0;
  };
  useEffect(() => {
    if (!(isLogged === 'true')) {
      localStorage.removeItem('user');
      localStorage.removeItem('userName');
      localStorage.removeItem('isAdmin');
      navigate('/login');
    }
    dispatch(clearPersistedState());
    dispatch(getCitiesLookupAllCities());
    // localStorage.removeItem('cityID');
    // localStorage.removeItem('branchId');
    // localStorage.removeItem('Team');
    // localStorage.removeItem('status');
  }, []);
  useEffect(() => {
    setLoading(false);
  }, [TeamList]);

  const handleTab = () => {
    const isAdminBoolean = isAdmin === 'true';
    const officeNumber = `${inputValues.Branch}`;
    const cityNumber = `${inputValues.City}`;
    if (inputValues.City === 99) {
      setLoading(true);
      const data = {
        LanguageId: 'AR',
        TicketDateFrom: moment(inputValues.startDate.$d).format('YYYY-MM-DD'),
        TicketDateTO: moment(inputValues.endDate.$d).format('YYYY-MM-DD'),
        Cities_NO: 'ALL',
        OFFICE_NO: 'ALL',
        IsAdmin: isAdminBoolean,
        TRANSACTION_TYPE: valueRDG,
      };
      setErrorMessageBranch('');
      dispatch(getTeamInfo(data));
      return false;
    }
    if (inputValues.City === '') {
      setErrorMessageCity('مطلوب');
      setflagFullName(true);
    }
    if (inputValues.Branch === '') {
      setErrorMessageBranch('مطلوب');
      setflagFullName(true);
      return false;
    }
    if (inputValues.Branch === 0) {
      setLoading(true);
      const data = {
        LanguageId: 'AR',
        TicketDateFrom: moment(inputValues.startDate.$d).format('YYYY-MM-DD'),
        TicketDateTO: moment(inputValues.endDate.$d).format('YYYY-MM-DD'),
        Cities_NO: cityNumber,
        OFFICE_NO: 'ALL',
        IsAdmin: isAdminBoolean,
        TRANSACTION_TYPE: valueRDG,
      };
      setErrorMessageBranch('');
      dispatch(getTeamInfo(data));
      return false;
    }
    setLoading(true);
    const data = {
      LanguageId: 'AR',
      TicketDateFrom: moment(inputValues.startDate.$d).format('YYYY-MM-DD'),
      TicketDateTO: moment(inputValues.endDate.$d).format('YYYY-MM-DD'),
      Cities_NO: cityNumber,
      OFFICE_NO: officeNumber,
      IsAdmin: isAdminBoolean,
      TRANSACTION_TYPE: valueRDG,
    };
    dispatch(getTeamInfo(data));
  };
  const exportToCSVWithoutOutSide = (apiData, fileName) => {
    const customHeadings = apiData.reduce((acc, curr) => {
      const _users = acc;
      return [
        ..._users,
        {
          teamNum: curr.teamNember,
          officeName: curr.officeName,
          closeDisConnectionTicketsNum: curr.totalNumberInSideList,
          numberOfConnection: curr.numberOfConnection,
          closeDConnectionTicketsNum: curr.totalNumberInSideList - curr.numberOfConnection,
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
      ' اسم المكتب ',
      'إجمالي مذكرات الوصل',
      'مذكرات الوصل التي تم وصلها ',
      'المذكرات التي لم يتم وصلها',
    ]);
    customHeadings.map((e) =>
      worksheet.addRow([
        e.teamNum,
        e.officeName,
        e.closeDisConnectionTicketsNum,
        e.numberOfConnection,
        e.closeDConnectionTicketsNum,
      ])
    );
    worksheet.columns[0].width = 10;
    worksheet.columns[1].width = 30;
    worksheet.columns[2].width = 30;
    worksheet.columns[3].width = 30;
    worksheet.columns[4].width = 30;
    worksheet.mergeCells('A1:E1');
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
  const exportToCSV = (apiData, fileName) => {
    const customHeadings = apiData.reduce((acc, curr) => {
      const _users = acc;
      return [
        ..._users,
        {
          teamNum: curr.teamNember,
          officeName: curr.officeName,
          totalNumberInSideList: curr.totalNumberInSideList,
          numberOfDisConnection: curr.numberOfDisConnection,
          numberOfOutSideList: curr.numberOfOutSideList,
          allTicketsDisconection: curr.numberOfDisConnection + curr.numberOfOutSideList,
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
      ' اسم المكتب ',
      ' إجمالي العدادات في الكشف',
      ' العدادات التي تم قطعها ',
      ' العدادات المنجزه خارج الكشف	',
      'مجموع العدادات التي تم قطعها',
    ]);
    customHeadings.map((e) =>
      worksheet.addRow([
        e.teamNum,
        e.officeName,
        e.totalNumberInSideList,
        e.numberOfDisConnection,
        e.numberOfOutSideList,
        e.allTicketsDisconection,
      ])
    );
    worksheet.columns[0].width = 10;
    worksheet.columns[1].width = 30;
    worksheet.columns[2].width = 30;
    worksheet.columns[3].width = 30;
    worksheet.columns[4].width = 30;
    worksheet.columns[5].width = 30;
    worksheet.mergeCells('A1:F1');
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
  function setLoadinSpinner() {
    setLoading(false);
  }
  return (
    <Page title="العدادات المنجزه حسب المكتب">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ display: 'flex', alignItems: 'center', p: 4, backgroundColor: '#EFEFEF' }}>
          <Grid container spacing={2}>
            <Grid item xs={8} md={12} lg={12}>
              <Typography variant="h4" component="h1" paragraph>
                العدادات المنجزه حسب المكتب
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
                    setinputValues({ ...inputValues, City: e.target.value, Branch: '' });
                    callBranchLookup(e.target.value);
                    setErrorMessageCity('');
                    setflagFullName(false);
                  }}
                  helperText={flagFullName ? ' مطلوب' : ''}
                  error={flagFullName}
                >
                  {CitiesList.map((t) => (
                    <MenuItem value={t.id}>{t.cityName}</MenuItem>
                  ))}
                </Select>
                <h4 className="errorMessage">{errorMessageCity}</h4>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={6} className={hiddenBranch ? 'visible' : 'invisible'}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"> المكتب</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="المكتب"
                  value={inputValues.Branch}
                  helperText={flagFullName ? ' مطلوب' : ''}
                  error={flagFullName}
                  inputProps={{ readOnly: disabledBranch }}
                  onChange={(e) => {
                    setinputValues({ ...inputValues, Branch: e.target.value });
                    setErrorMessageBranch('');
                    setflagFullName(false);
                  }}
                >
                  {BranchesList.map((t) => (
                    <MenuItem sx={{ width: '180px', height: '100%' }} value={t.branchID}>
                      {t.branchName}
                    </MenuItem>
                  ))}
                </Select>
                <h4 className="errorMessage">{errorMessageBranch}</h4>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormLabel id="demo-row-radio-buttons-group-label" sx={{ display: 'inline-block' }}>
                نوع الكشف:
              </FormLabel>
              <RadioGroup
                fullWidth
                sx={{ display: 'inline', marginLeft: 2, marginRight: 2 }}
                row
                value={valueRDG}
                onChange={handleChangeRadioGroup}
              >
                <FormControlLabel control={<Radio value={1} />} label="كشف وصل" />
                <FormControlLabel control={<Radio value={2} />} label="كشف قطع" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Button
                disabled={loading}
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
        {TeamList?.length > 0 ? (
          <>
            {valueRDG === '1' ? (
              <>
                {/* {setLoadinSpinner()} */}
                <Grid textAlign="end" item xs={12} md={6} lg={6}>
                  <Button
                    className={canExport === 'true' ? 'visible' : 'invisible'}
                    endIcon={<FileDownloadIcon />}
                    variant="outlined"
                    onClick={() => {
                      exportToCSVWithoutOutSide(TeamList, 'العدادات المنجزه حسب المكتب');
                    }}
                    fullwidth
                  >
                    تنزيل
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                <Grid textAlign="end" item xs={12} md={6} lg={6}>
                  <Button
                    className={canExport === 'true' ? 'visible' : 'invisible'}
                    endIcon={<FileDownloadIcon />}
                    variant="outlined"
                    onClick={() => {
                      exportToCSV(TeamList, 'العدادات المنجزه حسب المكتب');
                    }}
                    fullwidth
                  >
                    تنزيل
                  </Button>
                </Grid>
              </>
            )}
            <>
              <br />
              <TableContainer component={Paper} id="here">
                <Table sx={{ minWidth: 700 }} aria-label="customized table" ref={tableRef}>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>الفرقة</StyledTableCell>
                      <StyledTableCell align="center"> اسم المكتب </StyledTableCell>
                      {valueRDG === '2' ? (
                        <>
                          <StyledTableCell align="center"> طلبات الفصل المرسلة</StyledTableCell>
                          <StyledTableCell align="center"> طلبات الفصل المقطوعة </StyledTableCell>
                          <StyledTableCell align="center"> المقطوع من خارج الكشف </StyledTableCell>
                          <StyledTableCell align="center"> إجمالي المقطوع </StyledTableCell>
                        </>
                      ) : (
                        <>
                          <StyledTableCell align="center">إجمالي مذكرات الوصل</StyledTableCell>
                          <StyledTableCell align="center">مذكرات الوصل التي تم وصلها</StyledTableCell>
                          <StyledTableCell align="center">المذكرات التي لم يتم وصلها</StyledTableCell>
                        </>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {TeamList.map((TeamList) => (
                      <StyledTableRow key={TeamList.teamNember}>
                        {valueRDG === '1' ? (
                          <>
                            <StyledTableCell component="th" scope="row">
                              {TeamList.teamNember}
                            </StyledTableCell>
                            <StyledTableCell align="center">{TeamList.officeName}</StyledTableCell>
                            <StyledTableCell align="center">{TeamList.totalNumberInSideList}</StyledTableCell>
                            <StyledTableCell align="center">{TeamList.numberOfConnection}</StyledTableCell>
                            <StyledTableCell align="center">
                              {Math.abs(TeamList.totalNumberInSideList - TeamList.numberOfConnection)}
                            </StyledTableCell>
                          </>
                        ) : (
                          <></>
                        )}
                        {valueRDG === '2' ? (
                          <>
                            <StyledTableCell component="th" scope="row">
                              {TeamList.teamNember}
                            </StyledTableCell>
                            <StyledTableCell align="center">{TeamList.officeName}</StyledTableCell>
                            <StyledTableCell align="center">{TeamList.totalNumberInSideList}</StyledTableCell>
                            <StyledTableCell align="center">{TeamList.numberOfDisConnection}</StyledTableCell>
                            <StyledTableCell align="center">{TeamList.numberOfOutSideList}</StyledTableCell>
                            <StyledTableCell align="center">
                              {Math.abs(TeamList.numberOfDisConnection + TeamList.numberOfOutSideList)}
                            </StyledTableCell>
                          </>
                        ) : (
                          <></>
                        )}
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
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
      <SessionTimeout />
    </Page>
  );
}
