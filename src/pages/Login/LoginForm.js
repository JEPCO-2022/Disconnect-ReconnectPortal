import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginErr, userLogin } from '../../Redux/Login/LoginAction';
import { clearPersistedState } from '../../Redux/Customer/CustomerAction';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roleID = useSelector((state) => state.Login.role);
  const errorFlag = useSelector((state) => state.Login.errorFlag);
  const loading = useSelector((state) => state.Login.loading);
  // const isLogged = useSelector((state) => state.Login.isLogged);
  const [inputvalues, setinputvalues] = React.useState({
    username: '',
    password: '',
  });
  const [flag, setflag] = React.useState(false);
  const isLogged = localStorage.getItem('isLogged');

  React.useEffect(() => {
    dispatch(clearPersistedState());
    if (isLogged === 'true') {
      if (roleID === 2) {
        navigate('/dashboard/user/garandelReport');
      } else {
        navigate('/dashboard/user/meterdonebybranche');
      }
    }
  }, [isLogged]);

  React.useEffect(() => {
    if (errorFlag) {
      setflag(true);
    }
  }, [errorFlag]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setinputvalues({ username: e.target.username.value, password: e.target.password.value });
    const user = e.target.username.value;
    const pass = e.target.password.value;
    await dispatch(userLogin(user, pass));
    // if (dispatch(userLogin(user)) !== inputvalues.username || dispatch(userLogin(pass)) !== inputvalues.password) {
    //   dispatch(userLogin(user, pass));
    // }
  };

  return (
    <>
      <Stack spacing={3}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="اسم المستخدم"
            name="username"
            autoFocus
            error={flag}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="كلمة المرور"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={flag ? 'اسم المستخدم او كلمة المرور غير صحيحة' : ''}
            error={flag}
          />
          <br />
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            endIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            تسجيل دخول
          </Button>
        </Box>
      </Stack>
    </>
  );
}
