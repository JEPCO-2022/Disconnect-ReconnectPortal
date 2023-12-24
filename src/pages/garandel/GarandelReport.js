import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  CircularProgress,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import ExcelJS from 'exceljs';
import Paper from '@mui/material/Paper';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import moment from 'moment/moment';
import { useNavigate } from 'react-router';
import {
  getCitiesLookupAllCities,
  getBranchesLookupAllBranches,
  clearPersistedState,
  getGarandelReport,
} from '../../Redux/Customer/CustomerAction';
import useSettings from '../../hooks/useSettings';

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

const GarandelReport = () => {
  const { themeStretch } = useSettings();
  const [hiddenBranch, setHiddenBranch] = useState(true);
  const [disabledBranch, setDisabledBranch] = useState(false);
  const [errorMessageCity, setErrorMessageCity] = useState('');
  const [errorMessageBranch, setErrorMessageBranch] = useState('');
  const CitiesList = useSelector((state) => state.Customer.CitiesList);
  const BranchesList = useSelector((state) => state.Customer.BranchesList);
  const reportTable = useSelector((state) => state.Customer.reportGarandel);
  const canExport = localStorage.getItem('canExport');
  const [loading, setLoading] = useState(false);
  const tableRef = useRef(null);
  const [flagFullName, setflagFullName] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [flagErrorJN, setflagErrorJN] = useState(false);
  const [valueRDG, setValueRBG] = useState('1');
  const [typeSearch, setTypeSearch] = useState('1');
  const day = dayjs();
  const [inputValues, setinputValues] = useState({
    City: '',
    Branch: '',
    jobNumber: '',
    Status: '',
    startDate: day,
    endDate: day,
  });
  const dispatch = useDispatch();
  const isAdmin = localStorage.getItem('isAdmin');
  const userName = localStorage.getItem('userName');
  const isLogged = localStorage.getItem('isLogged');
  const navigate = useNavigate();

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
  }, [reportTable]);
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
    reportTable.length = 0;
  };
  const handleTab = () => {
    const fromDate = moment(inputValues.startDate.$d).format('YYYY-MM-DD');
    const endDate = moment(inputValues.endDate.$d).format('YYYY-MM-DD');
    const startDateObj = new Date(fromDate);
    const endDateObj = new Date(endDate);
    const timeDifference = endDateObj - startDateObj;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    if (daysDifference > 31) {
      setOpen(true);
      return false;
    }
    setOpen(false);
    const officeNumber = `${inputValues.Branch}`;
    const cityNumber = `${inputValues.City}`;
    if (typeSearch === '2') {
      if (inputValues.jobNumber === '') {
        setflagErrorJN(true);
      } else {
        setflagErrorJN(false);
        const data = {
          LanguageId: 'AR',
          TicketDateFrom: fromDate,
          TicketDateTO: endDate,
          Cities_NO: '',
          OFFICE_NO: '',
          TRANSACTION_TYPE: valueRDG,
          ReportType: 1,
          TechnicationCode: inputValues.jobNumber,
        };
        dispatch(getGarandelReport(data));
      }
    } else {
      if (inputValues.City === 99) {
        setLoading(true);
        const data = {
          LanguageId: 'AR',
          TicketDateFrom: fromDate,
          TicketDateTO: endDate,
          Cities_NO: 'ALL',
          OFFICE_NO: 'ALL',
          TRANSACTION_TYPE: valueRDG,
          ReportType: 1,
          TechnicationCode: inputValues.jobNumber,
        };
        setErrorMessageBranch('');
        dispatch(getGarandelReport(data));
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
          TicketDateFrom: fromDate,
          TicketDateTO: endDate,
          Cities_NO: cityNumber,
          OFFICE_NO: 'ALL',
          TRANSACTION_TYPE: valueRDG,
          ReportType: 1,
          TechnicationCode: inputValues.jobNumber,
        };
        setErrorMessageBranch('');
        dispatch(getGarandelReport(data));
        return false;
      }
      setLoading(true);
      const data = {
        LanguageId: 'AR',
        TicketDateFrom: fromDate,
        TicketDateTO: endDate,
        Cities_NO: cityNumber,
        OFFICE_NO: officeNumber,
        TRANSACTION_TYPE: valueRDG,
        ReportType: 1,
        TechnicationCode: inputValues.jobNumber,
      };
      dispatch(getGarandelReport(data));
      setLoading(false);
    }
  };
  const exporttoExcelConnect = (apiData, fileName) => {
    const customHeadings = apiData.reduce((acc, curr) => {
      const _users = acc;
      return [
        ..._users,
        {
          technician: curr.technician,
          technicianName: curr.technicianName,
          numberofTeams: curr.numberofTeams,
          numberOfOffices: curr.numberOfOffices,
          insideListCount: curr.insideListCount,
          insideListDoneCount: curr.insideListDoneCount,
          outSideListDoneCount: curr.outSideListDoneCount,
          allDoneCount: curr.allDoneCount,
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
    worksheet.addRow([
      ' الرقم الوظيفي ',
      ' اسم الفني ',
      ' عدد الفرق التي شارك فيها ',
      ' عدد المكاتب التي عمل فيها ',
      'عدد الطلبات المستحقة للقطع حسب كشف القطع ',
      ' عدد حركات القطع المنفذه بناء على الكشف ',
      ' عدد حركات القطع المنفذه خارج الكشف ',
      ' العدادات المفصولة كاملة ',
    ]);
    customHeadings.map((e) =>
      worksheet.addRow([
        e.technician,
        e.technicianName,
        e.numberofTeams,
        e.numberOfOffices,
        e.insideListCount,
        e.insideListDoneCount,
        e.outSideListDoneCount,
        e.allDoneCount,
      ])
    );
    worksheet.columns[0].width = 10;
    worksheet.columns[1].width = 35;
    worksheet.columns[2].width = 20;
    worksheet.columns[3].width = 20;
    worksheet.columns[4].width = 40;
    worksheet.columns[5].width = 40;
    worksheet.columns[6].width = 40;
    worksheet.columns[7].width = 30;
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
  const exporttoDisconnect = (apiData, fileName) => {
    const customHeadings = apiData.reduce((acc, curr) => {
      const _users = acc;
      return [
        ..._users,
        {
          technician: curr.technician,
          technicianName: curr.technicianName,
          numberofTeams: curr.numberofTeams,
          numberOfOffices: curr.numberOfOffices,
          closeNum: curr.insideListCount - curr.outSideListCount,
          insideListCount: curr.insideListCount,
          outSideListCount: curr.outSideListCount,
          insideListDoneCount: curr.insideListDoneCount,
          outSideListDoneCount: curr.outSideListDoneCount,
          allDoneCount: curr.allDoneCount,
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

    worksheet.addRow([
      ' الرقم الوظيفي ',
      ' اسم الفني ',
      ' عدد الفرق التي شارك فيها ',
      ' عدد المكاتب التي عمل فيها ',
      ' عدد الطلبات كاملة المستحقة للتوصيل ',
      'عدد الحركات اللازمة توصيلها حسب الكشف ',
      '  عدد الحركات اللازمة توصيلها خارج الكشف  ',
      '  عدد العدادات الموصولة بناء على الكشف  ',
      '  عدد العدادات الموصولة خارج الكشف  ',
      '  عدد العدادات الموصولة كاملة  ',
    ]);
    customHeadings.map((e) =>
      worksheet.addRow([
        e.technician,
        e.technicianName,
        e.numberofTeams,
        e.numberOfOffices,
        e.closeNum,
        e.insideListCount,
        e.outSideListCount,
        e.insideListDoneCount,
        e.outSideListDoneCount,
        e.allDoneCount,
      ])
    );
    worksheet.columns[0].width = 10;
    worksheet.columns[1].width = 30;
    worksheet.columns[2].width = 20;
    worksheet.columns[3].width = 20;
    worksheet.columns[4].width = 30;
    worksheet.columns[5].width = 30;
    worksheet.columns[6].width = 30;
    worksheet.columns[7].width = 30;
    worksheet.columns[8].width = 30;
    worksheet.columns[9].width = 30;
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
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ display: 'flex', alignItems: 'center', p: 4, backgroundColor: '#EFEFEF' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <Typography variant="h4" component="h1" paragraph>
                تقرير تجميعي لفنيين غرندل
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
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormLabel id="demo-row-radio-buttons-group-label" sx={{ display: 'inline-block' }}>
                البحث حسب :
              </FormLabel>
              <RadioGroup
                sx={{ display: 'inline', marginLeft: 2, marginRight: 2 }}
                row
                value={typeSearch}
                onChange={(e) => {
                  setTypeSearch(e.target.value);
                  setflagErrorJN(false);
                  setinputValues({ ...inputValues, jobNumber: '', Branch: '', City: '' });
                  setErrorMessageBranch(false);
                  setErrorMessageCity(false);
                  setflagFullName(false);
                  reportTable.length = 0;
                }}
              >
                <FormControlLabel control={<Radio value={1} />} label=" المحافظة " />
                <FormControlLabel control={<Radio value={2} />} label=" الرقم الوظيفي " />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormLabel id="demo-row-radio-buttons-group-label" sx={{ display: 'inline-block' }}>
                نوع الكشف:
              </FormLabel>
              <RadioGroup
                sx={{ display: 'inline', marginLeft: 2, marginRight: 2 }}
                row
                value={valueRDG}
                onChange={handleChangeRadioGroup}
              >
                <FormControlLabel control={<Radio value={1} />} label="كشف وصل" />
                <FormControlLabel control={<Radio value={2} />} label="كشف قطع" />
              </RadioGroup>
            </Grid>

            {typeSearch === '1' && (
              <>
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
                        <MenuItem value={t.id} key={t.id}>
                          {t.cityName}
                        </MenuItem>
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
                        <MenuItem sx={{ width: '180px', height: '100%' }} value={t.branchID} key={t.branchID}>
                          {t.branchName}
                        </MenuItem>
                      ))}
                    </Select>
                    <h4 className="errorMessage">{errorMessageBranch}</h4>
                  </FormControl>
                </Grid>
              </>
            )}
            {typeSearch === '2' && (
              <Grid item xs={12} md={12} lg={12}>
                <TextField
                  id="filled-basic"
                  label="الرقم الوظيفي"
                  variant="outlined"
                  fullWidth
                  type="number"
                  onChange={(e) => {
                    setinputValues({ ...inputValues, jobNumber: e.target.value });
                  }}
                  error={flagErrorJN}
                />
              </Grid>
            )}

            <Grid item xs={12} md={12} lg={12}>
              <Button
                className="nxt-btn-12-grid"
                variant="contained"
                onClick={() => handleTab()}
                endIcon={loading && <CircularProgress size={20} color="inherit" />}
              >
                إحضار
              </Button>
            </Grid>
          </Grid>
        </Card>

        <br />
        {reportTable?.length > 0 ? (
          <>
            {valueRDG === '2' ? (
              <>
                <Grid textAlign="end" item xs={12} md={6} lg={6}>
                  <Button
                    className={canExport === 'true' ? 'visible' : 'invisible'}
                    endIcon={<FileDownloadIcon />}
                    variant="outlined"
                    onClick={() => {
                      exporttoExcelConnect(reportTable, ' تقرير غرندل ');
                    }}
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
                      exporttoDisconnect(reportTable, ' تقرير غرندل ');
                    }}
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
                      <StyledTableCell> الرقم الوظيفي </StyledTableCell>
                      <StyledTableCell align="center"> اسم الفني </StyledTableCell>
                      <StyledTableCell align="center"> عدد الفرق التي شارك فيها </StyledTableCell>
                      <StyledTableCell align="center"> عدد المكاتب التي عمل فيها </StyledTableCell>
                      {valueRDG === '1' ? (
                        <>
                          <StyledTableCell align="center"> عدد الطلبات كاملة المستحقة للتوصيل </StyledTableCell>
                          <StyledTableCell align="center"> عدد الحركات اللازمة توصيلها حسب الكشف </StyledTableCell>
                          <StyledTableCell align="center"> عدد الحركات اللازمة توصيلها خارج الكشف </StyledTableCell>
                          <StyledTableCell align="center"> عدد العدادات الموصولة بناء على الكشف </StyledTableCell>
                          <StyledTableCell align="center"> عدد العدادات الموصولة خارج الكشف </StyledTableCell>
                          <StyledTableCell align="center"> عدد العدادات التي تم وصلها كاملة </StyledTableCell>
                        </>
                      ) : (
                        <>
                          <StyledTableCell align="center"> عدد الطلبات المستحقة للقطع حسب كشف القطع </StyledTableCell>
                          <StyledTableCell align="center"> عدد حركات القطع المنفذه بناء على الكشف </StyledTableCell>
                          <StyledTableCell align="center"> عدد حركات القطع المنفذه خارج الكشف </StyledTableCell>
                          <StyledTableCell align="center"> مجموع العدادات التي تم فصلها </StyledTableCell>
                        </>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reportTable.map((reportTable) => (
                      <StyledTableRow key={reportTable.mru}>
                        {valueRDG === '2' ? (
                          <>
                            <StyledTableCell component="th" scope="row">
                              {reportTable.technician}
                            </StyledTableCell>
                            <StyledTableCell align="center">{reportTable.technicianName}</StyledTableCell>
                            <StyledTableCell align="center">{reportTable.numberofTeams}</StyledTableCell>
                            <StyledTableCell align="center">{reportTable.numberOfOffices}</StyledTableCell>
                            <StyledTableCell align="center">{reportTable.insideListCount}</StyledTableCell>
                            <StyledTableCell align="center">{reportTable.insideListDoneCount}</StyledTableCell>
                            <StyledTableCell align="center">{reportTable.outSideListDoneCount}</StyledTableCell>
                            <StyledTableCell align="center">{reportTable.allDoneCount}</StyledTableCell>
                          </>
                        ) : (
                          <></>
                        )}
                        {valueRDG === '1' ? (
                          <>
                            <StyledTableCell component="th" scope="row">
                              {reportTable.technician}
                            </StyledTableCell>
                            <StyledTableCell align="center">{reportTable.technicianName}</StyledTableCell>
                            <StyledTableCell align="center">{reportTable.numberofTeams}</StyledTableCell>
                            <StyledTableCell align="center">{reportTable.numberOfOffices}</StyledTableCell>
                            <StyledTableCell align="center">
                              {Math.abs(reportTable.insideListCount + reportTable.outSideListCount)}
                            </StyledTableCell>
                            <StyledTableCell align="center">{reportTable.insideListCount}</StyledTableCell>
                            <StyledTableCell align="center">{reportTable.outSideListCount}</StyledTableCell>
                            <StyledTableCell align="center">{reportTable.insideListDoneCount}</StyledTableCell>
                            <StyledTableCell align="center">{reportTable.outSideListDoneCount}</StyledTableCell>
                            <StyledTableCell align="center">{reportTable.allDoneCount}</StyledTableCell>
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
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert severity="error" sx={{ width: '100%' }}>
            يجب ان تكون مدة التاريخ لا تزيد عن شهر 
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default GarandelReport;
