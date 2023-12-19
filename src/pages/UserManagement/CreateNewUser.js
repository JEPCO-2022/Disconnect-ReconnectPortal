import { useState, useEffect } from 'react';
// @mui
import {
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
// hooks
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, userRegister,rolesLookUp } from '../../Redux/Customer/CustomerAction';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

export default function CreateNewUser() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [administrator, setAdministrator] = useState(true);
  const [exportFiles, setExportFiles] = useState(true);
  const [flagFullName, setflagFullName] = useState(false);
  const [flagUserName, setflagUserName] = useState(false);
  const [flagPass, setflagPass] = useState(false);
  const [typeUser, setTypeUser] = useState('1');

  const [inputValues, setinputValues] = useState({
    fullName: '',
    userName: '',
    passowrd: '',
  });
  const allUsers = useSelector((state) => state.Customer.AllUsers);
  const roles = useSelector((state) => state.Customer.roles);

  const handleClick = () => {
    if (inputValues.userName === '') {
      setflagUserName(true);
    }
    if (inputValues.fullName === '') {
      setflagFullName(true);
    }
    if (inputValues.passowrd === '') {
      setflagPass(true);
      return 0;
    }
    allUsers.map((e) => {
      if (inputValues.userName === e.username) {
        setOpenError(true);
        return 0;
      }
      return 0;
    });
    const role = Number(typeUser);

    dispatch(
      userRegister(inputValues.userName, inputValues.passowrd, inputValues.fullName, administrator, exportFiles, role)
    );
    setOpen(true);
    setinputValues({ fullName: '', passowrd: '', userName: '' });
  };
  const handleClose = () => {
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
  const handChangeTypeUser = (event) => {
    setTypeUser(event.target.value);
    setAdministrator(true);
    if (event.target.value === '2') {
      setAdministrator(false);
    }
  };
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(rolesLookUp());

  }, []);
  return (
    <Page title="إضافة مستخدم جديد">
      <Container maxWidth={themeStretch ? false : 'xl'}>

        <Card sx={{ display: 'flex', alignItems: 'center', p: 4, backgroundColor: '#EFEFEF' }}>
          <Grid container spacing={2}>

            <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h4" component="h1" paragraph>
          إضافة مستخدم جديد
        </Typography>
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
                label="اسم المستخدم"
                variant="outlined"
                onChange={(e) => {
                  setinputValues({ ...inputValues, userName: e.target.value });
                  setflagUserName(false);
                }}
                value={inputValues.userName}
                helperText={flagUserName ? ' مطلوب' : ''}
                error={flagUserName}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="كلمة المرور"
                variant="outlined"
                type="password"
                value={inputValues.passowrd}
                autoComplete="current-password"
                onChange={(e) => {
                  setinputValues({ ...inputValues, passowrd: e.target.value });
                  setflagPass(false);
                }}
                helperText={flagPass ? 'مطلوب' : ''}
                error={flagPass}
              />
            </Grid>

            <Grid item xs={12} md={3} lg={3}>
              <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">النوع؟</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="1"
                  // value={administrator}
                  name="radio-buttons-group"
                  onChange={handChangeTypeUser}
                >
                  {roles?.map((role) => (
                    <FormControlLabel control={<Radio value={role.id} />} label={role.roleName} />
                  ))}                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">إمكانية استخراج الملفات</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="1"
                  // value={exportFiles}
                  name="radio-buttons-group"
                  onChange={handChangeExportFiles}
                >
                  <FormControlLabel control={<Radio value={1} />} label="نعم" />
                  <FormControlLabel control={<Radio value={0} />} label="لا" />
                </RadioGroup>
              </FormControl>
            </Grid>
            {typeUser === '1' && (
              <Grid item xs={12} md={6} lg={6}>
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
            )}
            <br/>
            <Grid item xs={12} md={3} lg={3}>
              <Button
                endIcon={<PersonAddIcon />}
                className="nxt-btn-12-grid"
                variant="contained"
                fullwidth
                onClick={handleClick}
              >
                إضافة
              </Button>
              <Snackbar open={open} autoHideDuration={1500} severity="success" onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  تمت الإضافه بنجاح
                </Alert>
              </Snackbar>
              <Snackbar open={openError} autoHideDuration={1500} severity="error" onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                  اسم المستخدم مكرر
                </Alert>
              </Snackbar>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
