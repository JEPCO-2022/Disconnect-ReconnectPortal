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
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
  DialogActions,
} from '@mui/material';
import ExcelJS from 'exceljs';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClearIcon from '@mui/icons-material/Clear';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import Paper from '@mui/material/Paper';
import { styled, alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import VerifiedIcon from '@mui/icons-material/Verified';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment/moment';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../components/Page';
import { userLogin } from '../Redux/Login/LoginAction';
import Map from '../components/Map';
import {
  getBranchesLookup,
  getCitiesLookup,
  getTeamsLookup,
  getEngineerAbandonedDecision,
  getAllUsers,
  SaveEngineerAbandonedDecision,
  clearPersistedState,
} from '../Redux/Customer/CustomerAction';
import '../index.css';
import useSettings from '../hooks/useSettings';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function PageNine() {
  const fileExtension = '.xlsx';
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const location = useLocation();

  const CitiesList = useSelector((state) => state.Customer.CitiesList);
  const BranchesList = useSelector((state) => state.Customer.BranchesList);
  const TeamsList = useSelector((state) => state.Customer.TeamList);
  const allAbandoned = useSelector((state) => state.Customer.AllAbandoned);
  const [inputValues, setinputValues] = useState({
    City: '',
    Branch: '',
    Team: '',
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  });

  const canExport = localStorage.getItem('canExport');
  const isAdmin = localStorage.getItem('isAdmin');
  const userName = localStorage.getItem('userName');
  const IDLocalStorage = localStorage.getItem('id');
  const ID = parseInt(IDLocalStorage, 36);
  // console.log(ID);
  // const canExport = useSelector((state) => state.Login.canExport);
  // const isAdmin = useSelector((state) => state.Login.isAdmin);
  // const userName = useSelector((state) => state.Login.userName);
  // const ID = useSelector((state) => state.Login.id);
  const [allAbandonedData, setAllAbandonedData] = useState([]);
  const [errorMessageCity, setErrorMessageCity] = useState('');
  const [errorMessageBranch, setErrorMessageBranch] = useState('');
  const [errorMessageTeam, setErrorMessageTeam] = useState('');
  const [flagCity, setflagCity] = useState(false);
  const [flagBranch, setflagBranch] = useState(false);
  const [flagTeam, setflagTeam] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [openSapMap, setOpenSapMap] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const navigate = useNavigate();
  const [ticketid, setTicketid] = useState('');
  const [maxWidth, setMaxWidth] = useState('sm');
  const [imageSrc, setImageSrc] = useState('sm');
  const isLogged = localStorage.getItem('isLogged');
  const [map, setMap] = useState({
    langSap: '',
    lang: '',
    lattSap: '',
    latt: '',
  });
  const open1 = Boolean(anchorEl);
  const handleClickOpenMap = (xPostionSap, yPostionSap) => {
    setOpen(true);
    setMap({ langSap: xPostionSap, lattSap: yPostionSap });
  };
  const handleClickOpenSapMap = (xPostion, yPostion) => {
    setOpenSapMap(true);
    setMap({ lang: xPostion, latt: yPostion });
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseSap = () => {
    setOpenSapMap(false);
  };
  const handleCloseImage = () => {
    setOpenImage(false);
  };
  const handleClick = (event, e) => {
    setAnchorEl(event.currentTarget);
    setTicketid(e);
  };
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
  function teamSetData(e) {
    setinputValues({ ...inputValues, Team: e });
    setErrorMessageTeam('');
    setflagTeam(false);
  }
  function handleTab() {
    const startdate = moment(inputValues.startDate.$d).format('YYYY-MM-DD');
    const enddate = moment(inputValues.endDate.$d).format('YYYY-MM-DD');
    const branchnumber = inputValues.Branch.toString();
    if (inputValues.City === '') {
      setErrorMessageCity('مطلوب');
      setflagCity(true);
    }
    if (inputValues.Branch === '') {
      setErrorMessageBranch('مطلوب');
      setflagBranch(true);
      return false;
    }
    dispatch(getEngineerAbandonedDecision(startdate, enddate, branchnumber, inputValues.Team));
  }
  useEffect(() => {
    dispatch(clearPersistedState());
    if (!(isLogged === 'true')) {
      localStorage.removeItem('user');
      localStorage.removeItem('userName');
      localStorage.removeItem('isAdmin');
      navigate('/login');
    }
    dispatch(getCitiesLookup());
    dispatch(getAllUsers());
  }, []);
  useEffect(() => {
    setAllAbandonedData(allAbandoned);
  }, [allAbandoned]);
  function consentWithDisconnection(e) {
    setAnchorEl(null);
    const ticketString = ticketid.toString();
    const newArray = [...allAbandonedData.filter((item) => item.abandonedTicketID !== ticketid)];
    setAllAbandonedData(newArray);
    dispatch(SaveEngineerAbandonedDecision(ticketString, e, userName, ID));
  }
  function consentWithOutDisconnection(e) {
    setAnchorEl(null);
    const ticketString = ticketid.toString();
    const newArray = [...allAbandonedData.filter((item) => item.abandonedTicketID !== ticketid)];
    setAllAbandonedData(newArray);
    setAllAbandonedData();
    dispatch(SaveEngineerAbandonedDecision(ticketString, e, userName, ID));
  }
  function reject(e) {
    setAnchorEl(null);
    const ticketString = ticketid.toString();
    const newArray = [...allAbandonedData.filter((item) => item.abandonedTicketID !== ticketid)];
    setAllAbandonedData(newArray);

    dispatch(SaveEngineerAbandonedDecision(ticketString, e, userName, ID));
  }
  function concate(districtName, zoneName, streetName) {
    if (districtName === undefined) districtName = '';
    if (zoneName === undefined) zoneName = '';
    if (streetName === undefined) streetName = '';
    const name = `${districtName} ${zoneName}  شارع  ${streetName}`;
    return name;
  }
  function imageSetSrc(srcimage) {
    setOpenImage(true);
    setImageSrc(srcimage);
  }
  function imageChcked() {
    const sourceImage = imageSrc;
    if (!(imageSrc === undefined || imageSrc === '' || imageSrc === '22')) {
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
  function phoneNumberChecked(phoneNumber) {
    if (phoneNumber === null || phoneNumber === undefined || phoneNumber === '') {
      return ' لا يوجد';
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
      ' عدد الفواتير	',
      ' الذمم',
      'رقم الهاتف',
      ' الموقع ',
    ]);
    customHeadings.map((e) =>
      worksheet.addRow([e.teaM_NO, e.meter_NO, e.cusT_Name, e.nO_DOC, e.customeR_BALANCE, e.teL_NUMBER, e.location])
    );
    worksheet.columns[0].width = 10;
    worksheet.columns[1].width = 20;
    worksheet.columns[2].width = 30;
    worksheet.columns[3].width = 10;
    worksheet.columns[4].width = 10;
    worksheet.columns[5].width = 25;
    worksheet.columns[6].width = 50;

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
    <>
      <Page title="تقرير المهجور">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 4, backgroundColor: '#EFEFEF' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
                <Typography variant="h4" component="h1" paragraph>
                  تقرير المهجور
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

              <Grid item xs={12} md={12} lg={12}>
                <Button className="nxt-btn-12-grid" variant="contained" fullwidth onClick={() => handleTab(1)}>
                  إحضار
                </Button>
              </Grid>
            </Grid>
          </Card>
          <br />
          <br />
          {allAbandonedData?.length > 0 ? (
            <>
              <Grid textAlign="end" item xs={12} md={12} lg={12}>
                <Button
                  className={canExport === 'true' ? 'visible' : 'invisible'}
                  endIcon={<FileDownloadIcon />}
                  variant="outlined"
                  onClick={() => {
                    exportToCSV(allAbandonedData, ' تقرير مهجور ');
                  }}
                  fullwidth
                >
                  تنزيل
                </Button>
              </Grid>
              <br />
              <br />
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>الفرقة</StyledTableCell>
                      <StyledTableCell align="center">رقم العداد </StyledTableCell>
                      <StyledTableCell align="center">اسم المشترك </StyledTableCell>
                      <StyledTableCell align="center">عدد الفواتير</StyledTableCell>
                      <StyledTableCell align="center">الذمم </StyledTableCell>
                      <StyledTableCell align="center">رقم الهاتف </StyledTableCell>
                      <StyledTableCell align="center">عنوان العداد </StyledTableCell>
                      <StyledTableCell align="center">صورة العداد </StyledTableCell>
                      <StyledTableCell align="center">موقع العداد </StyledTableCell>
                      <StyledTableCell align="center">موقع الفني </StyledTableCell>
                      <StyledTableCell align="center" />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allAbandonedData.map((rows) => {
                      return (
                        <StyledTableRow key={rows.abandonedTicketID}>
                          <StyledTableCell component="th" scope="row">
                            {rows.teaM_NO}
                          </StyledTableCell>
                          <StyledTableCell align="center">{rows.meter_NO}</StyledTableCell>
                          <StyledTableCell align="center">{rows.cusT_Name}</StyledTableCell>
                          <StyledTableCell align="center">{rows.nO_DOC}</StyledTableCell>
                          <StyledTableCell align="center">{rows.customeR_BALANCE}</StyledTableCell>
                          <StyledTableCell align="center">{phoneNumberChecked(rows.teL_NUMBER)}</StyledTableCell>
                          <StyledTableCell align="center" sx={{ minWidth: '20vh' }}>
                            {concate(rows.districtName, rows.zoneName, rows.streetName)}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Button
                              aria-haspopup="true"
                              variant="contained"
                              disableElevatio
                              onClick={() => {
                                imageSetSrc(rows.notArrivedImage);
                              }}
                            >
                              صورة
                            </Button>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Button
                              aria-haspopup="true"
                              variant="contained"
                              disableElevatio
                              onClick={() => {
                                // handleClickOpenMap(rows.x_POSITION, rows.y_POSITION);
                                handleClickOpenSapMap(rows.saP_X_POSITION, rows.saP_Y_POSITION);
                              }}
                            >
                              Map
                            </Button>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Button
                              aria-haspopup="true"
                              variant="contained"
                              disableElevatio
                              onClick={() => {
                                // handleClickOpenSapMap(rows.saP_X_POSITION, rows.saP_Y_POSITION);
                                handleClickOpenMap(rows.x_POSITION, rows.y_POSITION);
                              }}
                            >
                              Map
                            </Button>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <>
                              <Button
                                id="demo-customized-button"
                                aria-haspopup="true"
                                variant="contained"
                                disableElevatio
                                endIcon={<KeyboardArrowDownIcon />}
                                onClick={(e) => {
                                  handleClick(e, rows.abandonedTicketID);
                                }}
                              >
                                اختر إجراء
                              </Button>
                              <StyledMenu
                                id="demo-customized-menu"
                                MenuListProps={{
                                  'aria-labelledby': 'demo-customized-button',
                                }}
                                anchorEl={anchorEl}
                                open={open1}
                                onClose={handleClose1}
                              >
                                <MenuItem
                                  disableRipple
                                  onClick={() => {
                                    consentWithDisconnection(2);
                                  }}
                                >
                                  <VerifiedIcon />
                                  موافقة مع فصل
                                </MenuItem>
                                <MenuItem
                                  disableRipple
                                  onClick={() => {
                                    consentWithOutDisconnection(3);
                                  }}
                                >
                                  <UnpublishedIcon />
                                  موافقة بدون فصل
                                </MenuItem>
                                <Divider sx={{ my: 0.5 }} />
                                <MenuItem
                                  disableRipple
                                  onClick={() => {
                                    reject(4);
                                  }}
                                >
                                  <ClearIcon />
                                  رفض
                                </MenuItem>
                              </StyledMenu>
                            </>
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
            <DialogTitle sx={{ margin: 'auto' }}>موقع الفني</DialogTitle>
            <DialogContent>
              <Map lang={map.langSap} latt={map.lattSap} />
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
              <Button onClick={handleClose}>إغلاق</Button>
            </DialogActions>
          </Dialog>
          <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={openSapMap} onClose={handleCloseSap}>
            <DialogTitle sx={{ margin: 'auto' }}>موقع العداد</DialogTitle>
            <DialogContent>
              <Map lang={map.lang} latt={map.latt} />
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
              <Button onClick={handleCloseSap}>إغلاق</Button>
            </DialogActions>
          </Dialog>
          <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={openImage} onClose={handleCloseImage}>
            <DialogTitle sx={{ margin: 'auto' }}>صورة العداد</DialogTitle>
            <DialogContent>
              {imageChcked()}
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
              <Button onClick={handleCloseImage}>إغلاق</Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Page>
    </>
  );
}
