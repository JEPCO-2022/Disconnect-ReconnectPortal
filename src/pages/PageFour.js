import { useState, useEffect, useRef, useReducer, useCallback } from 'react';
// @mui
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
import ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
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
import { getBranchesLookup, getCitiesLookup, getTeamInfo, clearPersistedState } from '../Redux/Customer/CustomerAction';
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';

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
  // const userName = useSelector((state) => state.Login.userName);
  // const isAdmin = useSelector((state) => state.Login.isAdmin);
  // const canExport = useSelector((state) => state.Login.canExport);
  const isLogged = localStorage.getItem('isLogged');
  const isAdmin = localStorage.getItem('isAdmin');
  const canExport = localStorage.getItem('canExport');
  const userName = localStorage.getItem('userName');
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const separator = '';
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const [flagFullName, setflagFullName] = useState(false);
  const [errorMessageCity, setErrorMessageCity] = useState('');
  const [errorMessageBranch, setErrorMessageBranch] = useState('');
  const navigate = useNavigate();
  const fileExtension = '.xlsx';
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const [inputValues, setinputValues] = useState({
    City: '',
    Branch: '',
    DateReport: `${year}${separator}-${month < 10 ? `0${month}` : `${month}`}-${separator}${date}`,
  });
  const [valueRDG, setValueRBG] = useState('1');
  function callBranchLookup(cityID) {
    const isAdminBoolean = isAdmin === 'true';
    dispatch(getBranchesLookup(cityID, userName, isAdminBoolean));
  }
  const handleChangeRadioGroup = (event) => {
    setValueRBG(event.target.value);
  };

  useEffect(() => {
    console.log(userName);
    console.log(isLogged);
    if (!(isLogged === 'true')) {
      localStorage.removeItem('user');
      localStorage.removeItem('userName');
      localStorage.removeItem('isAdmin');
      navigate('/login');
    }
    // console.log(TeamList);
    // const navigation = window.performance.getEntriesByType('navigation')[0];
    // if (navigation.type === 'reload') {
    //   console.log('Page was refreshed');
    // }
    // refresh();
    // dispatch(clearPersistedState());
    dispatch(getCitiesLookup());
  }, []);
  // function refresh() {
  //   if (window.localStorage) {
  //     if (!localStorage.getItem('reload')) {
  //       localStorage.reload = true;
  //       window.location.reload();
  //     } else {
  //       localStorage.removeItem('reload');
  //     }
  //   }
  // }
  const handleTab = (e) => {
    if (inputValues.City === '') {
      setErrorMessageCity('مطلوب');
      setflagFullName(true);
    }
    if (inputValues.Branch === '') {
      setErrorMessageBranch('مطلوب');
      setflagFullName(true);
      return false;
    }
    const officeNumber = `${inputValues.Branch}`;
    const data = {
      LanguageId: 'AR',
      TicketDate: moment(inputValues.DateReport.$d).format('YYYY-MM-DD'),
      OFFICE_NO: officeNumber,
      TRANSACTION_TYPE: valueRDG,
    };
    dispatch(getTeamInfo(data));
  };
  const exportToCSV = (apiData, fileName) => {
    const customHeadings = apiData.reduce((acc, curr) => {
      const _users = acc;
      return [
        ..._users,
        {
          teamTotalTicketsNum: curr.teamTotalTicketsNum,
          closeDisConnectionTicketsNum: curr.closeDisConnectionTicketsNum,
          previousDayTicketsNumClosed: curr.previousDayTicketsNumClosed,
          previousDayTicketsNumClosede: curr.previousDayTicketsNumClosed,
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
      ' إجمالي العدادات في الكشف	 ',
      ' العدادات المنجزه في الكشف اليومي ',
      ' العدادات المنجزه في الأيام السابقة',
      ' العدادات المنجزه خارج الكشف ',
    ]);
    customHeadings.map((e) =>
      worksheet.addRow([
        e.teamTotalTicketsNum,
        e.closeDisConnectionTicketsNum,
        e.previousDayTicketsNumClosed,
        e.previousDayTicketsNumClosed,
      ])
    );
    worksheet.columns[0].width = 10;
    worksheet.columns[1].width = 30;
    worksheet.columns[2].width = 30;
    worksheet.columns[3].width = 30;
    worksheet.columns[4].width = 30;
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
  return (
    <Page title="العدادات المنجزه حسب المكتب">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ display: 'flex', alignItems: 'center', p: 4, backgroundColor: '#EFEFEF' }}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} md={12} lg={12} /> */}
            <Grid item xs={8} md={12} lg={12}>
              <Typography variant="h4" component="h1" paragraph>
                العدادات المنجزه حسب المكتب
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
            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"> المكتب</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="المكتب"
                  defaultValue={clearAll}
                  value={inputValues.Branch}
                  helperText={flagFullName ? ' مطلوب' : ''}
                  error={flagFullName}
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
            <Grid item xs={12} md={6} lg={6}>
              <Button className="nxt-btn-12-grid" variant="contained" fullwidth onClick={() => handleTab(1)}>
                بحث
              </Button>
            </Grid>
          </Grid>
        </Card>
        <br />
        {TeamList?.length > 0 ? (
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
            <br />
            <TableContainer component={Paper} id="here">
              <Table sx={{ minWidth: 700 }} aria-label="customized table" ref={tableRef}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>الفرقة</StyledTableCell>
                    <StyledTableCell align="center"> إجمالي العدادات في الكشف</StyledTableCell>
                    <StyledTableCell align="center">العدادات المنجزه في الكشف اليومي </StyledTableCell>
                    <StyledTableCell align="center"> العدادات المنجزه في الأيام السابقة </StyledTableCell>
                    <StyledTableCell align="center"> العدادات المنجزه خارج الكشف </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {TeamList.map((TeamList) => (
                    <StyledTableRow key={TeamList.teaM_NO}>
                      <StyledTableCell component="th" scope="row">
                        {TeamList.teaM_NO}
                      </StyledTableCell>
                      <StyledTableCell align="center">{TeamList.teamTotalTicketsNum}</StyledTableCell>
                      <StyledTableCell align="center">{TeamList.closeDisConnectionTicketsNum}</StyledTableCell>
                      <StyledTableCell align="center">{TeamList.previousDayTicketsNumClosed}</StyledTableCell>
                      <StyledTableCell align="center">{TeamList.previousDayTicketsNumClosed}</StyledTableCell>
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
  );
}
