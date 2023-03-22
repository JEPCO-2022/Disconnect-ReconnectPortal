import { useState, useEffect } from 'react';
import {
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Dialog,
  Menu,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
  DialogActions,
  FormLabel,
  FormControlLabel,
  Radio,
} from '@mui/material';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Paper from '@mui/material/Paper';
import { styled, alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment/moment';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../components/Page';
import { userLogin } from '../Redux/Login/LoginAction';
import Map from '../components/Map';
import {
  getBranchesLookup,
  getCitiesLookup,
  getTeamsLookup,
  getMaintenanceAndVigilanceReport,
} from '../Redux/Customer/CustomerAction';
import '../index.css';
import useSettings from '../hooks/useSettings';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const MaintenanceAndTampering = () => {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const location = useLocation();
  const CitiesList = useSelector((state) => state.Customer.CitiesList);
  const BranchesList = useSelector((state) => state.Customer.BranchesList);
  const TeamsList = useSelector((state) => state.Customer.TeamList);
  const DataReport = useSelector((state) => state.Customer.MaintenanceAndVigilanceReport);
  const [inputValues, setinputValues] = useState({
    City: '',
    Branch: '',
    Team: '',
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  });
  const fileExtension = '.xlsx';
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const isAdmin = useSelector((state) => state.Login.isAdmin);
  const userName = useSelector((state) => state.Login.userName);
  const canExport = useSelector((state) => state.Login.canExport);
  // const isAdmin = localStorage.getItem('isAdmin');
  // const canExport = localStorage.getItem('canExport');
  // const userName = localStorage.getItem('userName');
  const [errorMessageCity, setErrorMessageCity] = useState('');
  const [errorMessageBranch, setErrorMessageBranch] = useState('');
  const [errorMessageTeam, setErrorMessageTeam] = useState('');
  const [flagCity, setflagCity] = useState(false);
  const [flagBranch, setflagBranch] = useState(false);
  const [flagTeam, setflagTeam] = useState(false);
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [ticketid, setTicketid] = useState('');
  const [maxWidth, setMaxWidth] = useState('sm');
  const [sourceImage, setSourceImage] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [typeReport, setTypeReport] = useState(1);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (srcImage) => {
    setOpen(true);
    setSourceImage(srcImage);
  };
  function callTeamLookup(branchId) {
    setinputValues({ ...inputValues, Branch: branchId, Team: '' });
    dispatch(getTeamsLookup(branchId));
    setErrorMessageBranch('');
    setflagBranch(false);
  }
  function callBranchLookup(cityID) {
    setinputValues({ ...inputValues, City: cityID, Branch: '', Team: '' });
    // const isAdminBoolean = isAdmin === 'true';
    dispatch(getBranchesLookup(cityID, userName, isAdmin));
    setErrorMessageCity('');
    setflagCity(false);
  }
  function teamSetData(e) {
    setinputValues({ ...inputValues, Team: e });
    setErrorMessageTeam('');
    setflagTeam(false);
  }
  const handleTab = (e) => {
    if (inputValues.City === '') {
      setErrorMessageCity('مطلوب');
      setflagCity(true);
    }
    if (inputValues.Branch === '') {
      setErrorMessageBranch('مطلوب');
      setflagBranch(true);
      return false;
    }
    const startdate = moment(inputValues.startDate.$d).format('YYYY-MM-DD');
    const enddate = moment(inputValues.endDate.$d).format('YYYY-MM-DD');
    const branchnumber = inputValues.Branch.toString();
    dispatch(getMaintenanceAndVigilanceReport(startdate, enddate, branchnumber, inputValues.Team, typeReport));
    if (DataReport?.length > 0) {
      setShowTable(true);
    }
  };
  const handChangeTyprReport = (event) => {
    setTypeReport(event.target.value);
    return 0;
  };

  useEffect(() => {
    setShowTable(false);
    dispatch(getCitiesLookup());
  }, []);
  function showImage() {
    if (!(sourceImage === undefined || sourceImage === '' || sourceImage === '22')) {
      return (
        <>
          <img src={`data:image/jpeg;base64,${sourceImage}`} alt="images" className="srcImage" />
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

  const exportToCSV = (apiData, fileName) => {
    const customHeadings = apiData.reduce((acc, curr) => {
      const _users = acc;
      return [
        ..._users,
        {
          'رقم الفرقة': curr.TEAM_NO,
          ' رقم العداد	 ': curr.meter_NO,
          ' اسم المشترك	 ': curr.cusT_Name,
          ' الإجراء الحالي': curr.ticketStatusNameAR,
          ' عدد الفواتير	 ': curr.nO_DOC,
          '  الذمم	 ': curr.customeR_BALANCE,
          '  رقم الهاتف	 ': curr.teL_NUMBER,
        },
      ];
    }, []);
    const RowInfo = [
      {
        width: 10,
      },
      {
        width: 20,
      },
      {
        width: 20,
      },
      {
        width: 20,
      },
      {
        width: 10,
      },
      {
        width: 15,
      },
      {
        width: 20,
      },
    ];
    const head = [' تفاصيل الكشف حسب المكتب '];
    const merge = [{ s: { c: 0, r: 0 }, e: { c: 6, r: 0 } }];
    const ws = XLSX.utils.json_to_sheet(customHeadings, { origin: 'A2' });
    ws['!cols'] = RowInfo;
    ws['!merges'] = merge;
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    XLSX.utils.sheet_add_aoa(ws, [head], { origin: 'A1' });
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return (
    <>
      <Page title="تقرير عبث وصيانة">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 4, backgroundColor: '#EFEFEF' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
                <Typography variant="h4" component="h1" paragraph>
                  تقرير عبث وصيانة
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
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">مشرف؟</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="1"
                    name="radio-buttons-group"
                    onChange={handChangeTyprReport}
                  >
                    <FormControlLabel control={<Radio value={1} />} label="صيانة" />
                    <FormControlLabel control={<Radio value={2} />} label="عبث" />
                    <FormControlLabel control={<Radio value={3} />} label="الكل" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Button className="nxt-btn-12-grid" variant="contained" fullwidth onClick={() => handleTab(1)}>
                  إحضار
                </Button>
              </Grid>
            </Grid>
          </Card>
          <br />
          <br />
          {DataReport?.length > 0 ? (
            <>
              <Grid textAlign="end" item xs={12} md={12} lg={12}>
                <Button
                  className={canExport ? 'visible' : 'invisible'}
                  endIcon={<FileDownloadIcon />}
                  variant="outlined"
                  onClick={() => {
                    exportToCSV(DataReport, 'تقرير عبث وصيانة');
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
                      <StyledTableCell>الفرقة</StyledTableCell>
                      <StyledTableCell align="center">رقم العداد </StyledTableCell>
                      <StyledTableCell align="center">اسم المشترك </StyledTableCell>
                      <StyledTableCell align="center"> صيانة او عبث </StyledTableCell>
                      <StyledTableCell align="center">عدد الفواتير</StyledTableCell>
                      <StyledTableCell align="center">الذمم </StyledTableCell>
                      <StyledTableCell align="center">رقم الهاتف </StyledTableCell>
                      <StyledTableCell align="center" />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {DataReport.map((rows) => {
                      return (
                        <StyledTableRow key={rows.abandonedTicketID}>
                          <StyledTableCell component="th" scope="row">
                            {rows.teaM_NO}
                          </StyledTableCell>
                          <StyledTableCell align="center">{rows.meter_NO}</StyledTableCell>
                          <StyledTableCell align="center">{rows.meter_NO}</StyledTableCell>
                          <StyledTableCell align="center">{rows.meter_NO}</StyledTableCell>
                          <StyledTableCell align="center">{rows.meter_NO}</StyledTableCell>
                          <StyledTableCell align="center">{rows.maintenanceAndVigilanceType}</StyledTableCell>
                          <StyledTableCell align="center">{rows.maintenanceAndVigilanceType}</StyledTableCell>
                          <StyledTableCell align="center">
                            <Button
                              aria-haspopup="true"
                              variant="contained"
                              disableElevatio
                              onClick={() => {
                                handleOpen(rows.vigilanceImage);
                              }}
                            >
                              صورة
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: 'auto', marginTop: '5vh' }}>
              <Grid item xs={12} md={12} lg={12}>
                <Typography variant="h5" component="h1" paragraph>
                  لا يوجد
                </Typography>
              </Grid>
            </Box>
          )}
          <br />
          <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose}>
            <DialogTitle sx={{ margin: 'auto' }}>صورة العداد</DialogTitle>
            {showImage()}
            <DialogContent>
              <Box
                noValidate
                component="form"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  m: 'auto',
                  width: '50vh',
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
          ;
        </Container>
      </Page>
    </>
  );
};

export default MaintenanceAndTampering;
