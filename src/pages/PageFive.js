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
import '../index.css';
import { read, utils, writeFile } from 'xlsx';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { Link, useNavigate } from 'react-router-dom';
import {
  ClearAllUserBranch,
  clearPersistedState,
  getBranchesLookup,
  getCitiesLookup,
  getMeterReportByTeam,
  getTeamsLookup,
} from '../Redux/Customer/CustomerAction';
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
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
  const isAdmin = localStorage.getItem('isAdmin');
  const canExport = localStorage.getItem('canExport');
  const userName = localStorage.getItem('userName');
  const CitiesList = useSelector((state) => state.Customer.CitiesList);
  const BranchesList = useSelector((state) => state.Customer.BranchesList);
  const TeamsList = useSelector((state) => state.Customer.TeamList);
  const tableData = useSelector((state) => state.Customer.MeterReportByTeam);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isIdle, setIsIdle] = useState();
  const separator = '';
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const [errorMessageCity, setErrorMessageCity] = useState('');
  const [errorMessageBranch, setErrorMessageBranch] = useState('');
  const [errorMessageTeam, setErrorMessageTeam] = useState('');
  const [flagCity, setflagCity] = useState(false);
  const [flagBranch, setflagBranch] = useState(false);
  const [flagTeam, setflagTeam] = useState(false);
  const [search, setSearch] = useState('');
  const isLogged = localStorage.getItem('isLogged');
  const [t, setT] = useState('');
  const [inputValues, setinputValues] = useState({
    City: '',
    Branch: '',
    Team: '',
    DateReport: `${year}${separator}-${month < 10 ? `0${month}` : `${month}`}-${separator}${date}`,
  });

  const [valueRDG, setValueRBG] = useState('1');
  const fileExtension = '.xlsx';
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  function callTeamLookup(branchId) {
    setinputValues({ ...inputValues, Branch: branchId, Team: '' });
    dispatch(getTeamsLookup(branchId));
    setErrorMessageBranch('');
    setflagBranch(false);
  }
  function callBranchLookup(cityID) {
    setinputValues({ ...inputValues, City: cityID, Branch: '', Team: '' });
    const isAdminBoolean = isAdmin === 'true';
    dispatch(getBranchesLookup(cityID, userName, isAdminBoolean));
    setErrorMessageCity('');
    setflagCity(false);
  }
  const handleChangeRadioGroup = (event) => {
    setValueRBG(event.target.value);
  };
  useEffect(() => {
    if (!(isLogged === 'true')) {
      localStorage.removeItem('user');
      localStorage.removeItem('userName');
      localStorage.removeItem('isAdmin');
      navigate('/login');
    }
    dispatch(getCitiesLookup());
    dispatch(ClearAllUserBranch());
  }, []);
  const tableRef = useRef(null);
  const handleTab = (e) => {
    if (inputValues.City === '') {
      setErrorMessageCity('مطلوب');
      setflagCity(true);
    }
    if (inputValues.Branch === '') {
      setErrorMessageBranch('مطلوب');
      setflagBranch(true);
    }
    if (inputValues.Team === '') {
      setErrorMessageTeam(' مطلوب ');
      setflagTeam(true);
      return false;
    }
    const teamNumber = `${inputValues.Team}`;
    const data = {
      LanguageId: 'AR',
      TicketDate: moment(inputValues.DateReport.$d).format('YYYY-MM-DD'),
      TEAM_NO: teamNumber,
      TRANSACTION_TYPE: valueRDG,
    };
    dispatch(getMeterReportByTeam(data));
  };

  function teamSetData(e) {
    setinputValues({ ...inputValues, Team: e });
    setErrorMessageTeam('');
    setflagTeam(false);
  }

  function phoneNumberChecked(phoneNumber) {
    if (phoneNumber === null || phoneNumber === undefined || phoneNumber === '') {
      return 'لا يوجد';
    }
    return phoneNumber;
  }
  const exportToCSV = (apiData, fileName) => {
    const customHeadings = apiData.reduce((acc, curr) => {
      const _users = acc;
      return [
        ..._users,
        {
          teaM_NO: curr.teaM_NO,
          meter_NO: curr.meter_NO,
          cusT_Name: curr.cusT_Name,
          ticketStatusNameAR: curr.ticketStatusNameAR,
          nO_DOC: curr.nO_DOC,
          customeR_BALANCE: curr.customeR_BALANCE,
          teL_NUMBER: phoneNumberChecked(curr.teL_NUMBER),
          location: concate(curr.districtName, curr.zoneName, curr.streetName),
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
      'رقم العداد',
      ' اسم المشترك',
      '  الإجراء الحالي',
      ' عدد الفواتير	',
      ' الذمم',
      'رقم الهاتف',
      ' الموقع ',
    ]);
    customHeadings.map((e) =>
      worksheet.addRow([
        e.teaM_NO,
        e.meter_NO,
        e.cusT_Name,
        e.ticketStatusNameAR,
        e.nO_DOC,
        e.customeR_BALANCE,
        e.teL_NUMBER,
        e.location,
      ])
    );
    worksheet.columns[0].width = 10;
    worksheet.columns[1].width = 20;
    worksheet.columns[2].width = 30;
    worksheet.columns[3].width = 20;
    worksheet.columns[4].width = 10;
    worksheet.columns[5].width = 10;
    worksheet.columns[6].width = 20;
    worksheet.columns[7].width = 60;
    worksheet.mergeCells('A1:H1');
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
  function concate(districtName, zoneName, streetName) {
    if (districtName === undefined) districtName = '';
    if (zoneName === undefined) zoneName = '';
    if (streetName === undefined) streetName = '';
    const name = `${districtName} ${zoneName} شارع ${streetName}`;
    const non = 'لا يوجد';
    if (districtName === ' ' && zoneName === ' ' && streetName === ' ') return non;
    return name;
  }
  return (
    <>
      <Page title="تفاصيل الكشف حسب الفرقة">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 4, backgroundColor: '#EFEFEF' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
                <Typography variant="h4" component="h1" paragraph>
                  تفاصيل الكشف حسب الفرقة
                </Typography>
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
              <Grid item xs={12} md={6} lg={6}>
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
                  <InputLabel id="demo-simple-select-label"> الفرقه</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="الفرقه"
                    value={inputValues.Team}
                    onChange={(e) => {
                      teamSetData(e.target.value);
                    }}
                    helperText={flagTeam ? ' مطلوب' : ''}
                    error={flagTeam}
                  >
                    {TeamsList.map((t) => (
                      <MenuItem value={t.teaM_NO}>{t.teaM_NO}</MenuItem>
                    ))}
                  </Select>
                  <h4 className="errorMessage">{errorMessageTeam}</h4>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="تاريخ التقرير"
                    inputFormat="DD/MM/YYYY"
                    value={inputValues.DateReport}
                    onChange={(e) => {
                      setinputValues({ ...inputValues, DateReport: e });
                    }}
                    renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
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
                <Button className="nxt-btn-12-grid" variant="contained" fullwidth onClick={() => handleTab(1)}>
                  بحث
                </Button>
              </Grid>
            </Grid>
          </Card>

          <br />

          <br />
          {tableData?.length > 0 ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                  <Divider light />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <TextField
                    fullWidth
                    placeholder="بحث"
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                  />
                </Grid>
                <Grid textAlign="end" item xs={12} md={12} lg={12}>
                  <Button
                    className={canExport === 'true' ? 'visible' : 'invisible'}
                    endIcon={<FileDownloadIcon />}
                    variant="outlined"
                    onClick={() => {
                      exportToCSV(tableData, 'تفاصيل الكشف حسب الفرقة');
                    }}
                    fullwidth
                  >
                    تنزيل
                  </Button>
                </Grid>
              </Grid>
              <br />
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table" ref={tableRef}>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>الفرقة</StyledTableCell>
                      <StyledTableCell align="center">رقم العداد </StyledTableCell>
                      <StyledTableCell align="center">اسم المشترك </StyledTableCell>
                      <StyledTableCell align="center">الإجراء الحالي</StyledTableCell>
                      <StyledTableCell align="center">عدد الفواتير</StyledTableCell>
                      <StyledTableCell align="center">الذمم </StyledTableCell>
                      <StyledTableCell align="center">رقم الهاتف </StyledTableCell>
                      <StyledTableCell align="center"> الموقع </StyledTableCell>
                      <StyledTableCell align="center">تفاصيل</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData
                      .filter((item) => {
                        return search === ''
                          ? item
                          : item.meter_NO.includes(search) ||
                              item.cusT_Name.includes(search) ||
                              item.ticketStatusNameAR.includes(search) ||
                              phoneNumberChecked(item.teL_NUMBER).includes(search);
                      })
                      .map((data) => (
                        <StyledTableRow key={data.id}>
                          <StyledTableCell component="th" scope="row">
                            {data.teaM_NO}
                          </StyledTableCell>
                          <StyledTableCell align="center">{data.meter_NO}</StyledTableCell>
                          <StyledTableCell align="center">{data.cusT_Name}</StyledTableCell>
                          <StyledTableCell align="center">{data.ticketStatusNameAR}</StyledTableCell>
                          <StyledTableCell align="center">{data.nO_DOC}</StyledTableCell>
                          <StyledTableCell align="center"> {data.customeR_BALANCE}</StyledTableCell>
                          <StyledTableCell align="center">{phoneNumberChecked(data.teL_NUMBER)}</StyledTableCell>

                          <StyledTableCell align="center">
                            {concate(data.districtName, data.zoneName, data.streetName)}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Button
                              onClick={() => {
                                navigate(`/dashboard/user/detailsdetiction/${data.id}`, {
                                  state: {
                                    ticketID: data.id,
                                    teamNumber: data.teaM_NO,
                                    customName: data.cusT_Name,
                                    fileNumber: data.file_NO,
                                    meterNumber: data.meter_NO,
                                  },
                                });
                              }}
                            >
                              تفاصيل
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <Grid textAlign="end" item xs={12} md={6} lg={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center', margin: 'auto', marginTop: '5vh' }}>
                <Grid item xs={12} md={12} lg={12}>
                  <Typography variant="h5" component="h1" paragraph>
                    لا يوجد
                  </Typography>
                </Grid>
              </Box>
            </Grid>
          )}

          <br />
        </Container>
      </Page>
    </>
  );
}
