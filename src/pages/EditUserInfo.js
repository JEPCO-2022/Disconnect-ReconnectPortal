// @mui
import {
  Button,
  Card,
  Container,
  Snackbar,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
// hooks
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import SessionTimeout from './SessionTimeout';
import { userUpdateInfo, getAllUsers } from '../Redux/Customer/CustomerAction';
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
// ----------------------------------------------------------------------

export default function EditUserInfo() {
  const { themeStretch } = useSettings();
  const [open, setOpen] = useState(false);
  const [ref, useRef] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  let nameLocation = '';
  let idLocation = '';
  let userNameLocation = '';
  const allUsers = useSelector((state) => state.Customer.AllUsers);
  const [flagFullName, setflagFullName] = useState(false);
  const [flagUserName, setflagUserName] = useState(false);
  const [flagPass, setflagPass] = useState(false);
  const [administrator, setAdministrator] = useState(true);
  const [exportFiles, setExportFiles] = useState(true);
  const navigate = useNavigate();
  const isLogged = localStorage.getItem('isLogged');
  const [inputValues, setinputValues] = useState({
    id: '',
    fullName: '',
    userName: '',
    passowrd: '',
  });
  function getPasswordUsers() {
    let pass = '';
    dispatch(getAllUsers());
    nameLocation = location.state.fullName;
    idLocation = location.state.idNumber;
    userNameLocation = location.state.username;
    for (let index = 0; index < allUsers.length; index += 1)
      if (allUsers[index].username === userNameLocation) pass = allUsers[index].password;
    setinputValues({ id: idLocation, userName: userNameLocation, fullName: nameLocation, passowrd: pass });
  }
  useEffect(() => {
    if (!(isLogged === 'true')) {
      localStorage.removeItem('user');
      localStorage.removeItem('userName');
      localStorage.removeItem('isAdmin');
      navigate('/login');
    }
    getPasswordUsers();
  }, [ref]);

  function handleClick() {
    if (inputValues.fullName === '') {
      setflagFullName(true);
    }
    if (inputValues.passowrd === '') {
      setflagPass(true);
      return 0;
    }
    if (inputValues.fullName === '') {
      return 0;
    }
    const boolOutputExportFiles = exportFiles === 'true';
    const boolOutputAdministrator = administrator === 'true';
    dispatch(
      userUpdateInfo(
        inputValues.id,
        inputValues.passowrd,
        inputValues.fullName,
        boolOutputAdministrator,
        boolOutputExportFiles
      )
    );
    setOpen(true);
    setinputValues({ fullName: '', passowrd: '' });
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handChangeAdminstration = (event) => {
    if (event.target.value === '1') {
      setAdministrator(true);
      return 0;
    }
    if (event.target.value === '0') {
      setAdministrator(false);
      return 0;
    }
  };
  const handChangeExportFiles = (event) => {
    if (event.target.value === '1') {
      setExportFiles(true);
      return 0;
    }
    if (event.target.value === '0') {
      setExportFiles(false);
      return 0;
    }
  };

  return (
    <Page title="Page Six">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          تعديل معلومات مستخدم
        </Typography>
        <Card sx={{ display: 'flex', alignItems: 'center', p: 4, backgroundColor: '#EFEFEF' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              تعديل معلومات مستخدم
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider light />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <TextField
                fullWidth
                label="الاسم الكامل"
                variant="outlined"
                onChange={(e) => {
                  setinputValues({ ...inputValues, fullName: e.target.value });
                  setflagFullName(false);
                }}
                value={inputValues.fullName}
                helperText={flagFullName ? ' مطلوب' : ''}
                error={flagFullName}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <TextField
                fullWidth
                value={inputValues.userName}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="كلمة المرور"
                variant="outlined"
                autoComplete="current-password"
                onChange={(e) => {
                  setinputValues({ ...inputValues, passowrd: e.target.value });
                  setflagPass(false);
                }}
                value={inputValues.passowrd}
                helperText={flagPass ? ' مطلوب' : ''}
                error={flagPass}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">مشرف؟</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="1"
                  name="radio-buttons-group"
                  onChange={handChangeAdminstration}
                >
                  <FormControlLabel control={<Radio value={1} />} label="نعم" />
                  <FormControlLabel control={<Radio value={0} />} label="لا" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={3}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">إمكانية استخراج الملفات</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="1"
                  name="radio-buttons-group"
                  onChange={handChangeExportFiles}
                >
                  <FormControlLabel control={<Radio value={1} />} label="نعم" />
                  <FormControlLabel control={<Radio value={0} />} label="لا" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Button
                endIcon={<ArrowBackIcon />}
                variant="contained"
                fullwidth
                onClick={() => navigate(`/dashboard/AllUsersAndRoles`)}
              >
                رجوع
              </Button>
              <Button
                sx={{ marginLeft: 2 }}
                endIcon={<ModeEditOutlineIcon />}
                variant="contained"
                fullwidth
                onClick={(e) => {
                  handleClick();
                }}
              >
                تعديل
              </Button>
            </Grid>
            <Snackbar open={open} autoHideDuration={1500} severity="success" onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                تم التعديل بنجاح
              </Alert>
            </Snackbar>
            <Grid item xs={12} md={6} lg={6}>
              <Snackbar open={open} autoHideDuration={1500} severity="success" onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  تم التعديل بنجاح
                </Alert>
              </Snackbar>
            </Grid>
          </Grid>
        </Card>
      </Container>
      <SessionTimeout />
    </Page>
  );
}
