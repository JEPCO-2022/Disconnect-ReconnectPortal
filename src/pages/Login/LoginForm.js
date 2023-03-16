import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginErr, userLogin } from '../../Redux/Login/LoginAction';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputvalues, setinputvalues] = React.useState({
    username: '',
    password: '',
  });
  const [inputvaluesErr, setinputvaluesErr] = React.useState({
    usernameErr: '',
    passwordErr: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [flag, setflag] = React.useState(false);

  const userToken = useSelector((state) => state.Login.userToken);
  const isLogged = useSelector((state) => state.Login.isLogged);

  React.useEffect(() => {
    if (isLogged) {
      navigate('/dashboard/user/meterdonebybranche');
    }
  }, [isLogged]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setinputvalues({ username: e.target.username.value, password: e.target.password.value });
    const user = e.target.username.value;
    const pass = e.target.password.value;
    await dispatch(userLogin(user, pass));

    //
    if (dispatch(userLogin(user)) !== inputvalues.username || dispatch(userLogin(pass)) !== inputvalues.password) {
      console.log(dispatch(userLogin(user, pass)));
      const isAdmin = localStorage.getItem('isAdmin');

      setflag(true);
    } else {
      console.log('d');
    }
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
          <Button fullWidth size="large" type="submit" variant="contained">
            تسجيل دخول
          </Button>
        </Box>
      </Stack>
    </>
  );
}
