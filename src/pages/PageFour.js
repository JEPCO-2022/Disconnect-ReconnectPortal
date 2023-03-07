import { useState, useEffect, useRef } from 'react';
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
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
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
import { DownloadTableExcel } from 'react-export-table-to-excel';
// hooks
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { getBranchesLookup, getCitiesLookup, getTeamInfo, ClearAllUserBranch } from '../Redux/Customer/CustomerAction';
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
  const fileExtension = '.xlsx';
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const [inputValues, setinputValues] = useState({
    City: '',
    Branch: '',
    DateReport: `${year}${separator}-${month < 10 ? `0${month}` : `${month}`}-${separator}${date}`,
  });
  const [valueRDG, setValueRBG] = useState('1');
  const [showElement, setshowElement] = useState(0);
  function callBranchLookup(cityID) {
    dispatch(getBranchesLookup(cityID));
  }
  const handleChangeRadioGroup = (event) => {
    setValueRBG(event.target.value);
  };
  useEffect(() => {
    dispatch(getCitiesLookup());
    dispatch(ClearAllUserBranch());
  }, []);
  const handleTab = (e) => {
    if (inputValues.City === '') {
      setErrorMessageCity('مطلوب');
      setflagFullName(true);
    }
    if (inputValues.Branch === '') {
      setErrorMessageBranch('مطلوب');
      setflagFullName(true);
      setshowElement(0);
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
    setshowElement(e);
  };
  const exportToCSV = (apiData, fileName) => {
    const customHeadings = apiData.reduce((acc, curr) => {
      const _users = acc;
      console.log('curr', curr);
      console.log('acc', acc);
      return [
        ..._users,
        {
          'رقم الفرقة': curr.teaM_NO,
          '  العدادات المنجزه في الأيام السابقة': curr.previousDayTicketsNumClosed,
          ' العدادات المنجزه في الكشف اليوم ': curr.closeDisConnectionTicketsNum,
          '  إجمالي العدادات في الكشف': curr.teamTotalTicketsNum,
        },
      ];
    }, []);
    console.log(customHeadings);
    const ws = XLSX.utils.json_to_sheet(customHeadings);
    // XLSX.utils.sheet_add_aoa(ws, [['Name', 'Birthday', 'Age', 'City']], { origin: 'A1' });
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Page title="العدادات المنجزه حسب المكتب">
      <Container maxWidth={themeStretch ? false : 'xl'}>

        <Card sx={{ display: 'flex', alignItems: 'center', p: 4, backgroundColor: '#EFEFEF' }}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} md={12} lg={12} /> */}
            <Grid item xs={12} md={12} lg={12}>
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
                    <MenuItem value={t.branchID}>{t.branchName}</MenuItem>
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
            <Grid item xs={12} md={6} lg={6}>
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
        <Grid textAlign="end" item xs={12} md={6} lg={6}>
          <Button
            endIcon={<FileDownloadIcon />}
            className={showElement === 1 ? 'visible nxt-btn-12-grid' : 'invisible'}
            variant="outlined"
            onClick={() => {
              exportToCSV(TeamList, 'القطع والوصل');
            }}
            fullwidth
          >
            تنزيل
          </Button>
        </Grid>
        <br />
        <TableContainer component={Paper} className={showElement === 1 ? 'visible' : 'invisible'} ref={tableRef}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table" ref={tableRef}>
            <TableHead>
              <TableRow>
                <StyledTableCell>الفرقة</StyledTableCell>
                <StyledTableCell align="center"> إجمالي العدادات في الكشف</StyledTableCell>
                <StyledTableCell align="center">العدادات المنجزه في الكشف اليومي </StyledTableCell>
                <StyledTableCell align="center"> العدادات المنجزه في الأيام السابقة </StyledTableCell>
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
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Page>
  );
}
