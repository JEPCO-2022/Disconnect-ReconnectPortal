import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import cookie from 'react-cookies';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ExpiredIcon from '../assets/expired-131964752748201554.png';

const SessionTimeout = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const timeoutDuration = 30 * 60 * 1000;
  let timeout;
  const resetTimeout = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setShowPopup(true);
      setOpen(true);
    }, timeoutDuration);
  };
  const logout = () => {
    window.open('/login', '_self');
    cookie.remove('user');
    cookie.remove('userName');
    localStorage.removeItem('user');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isLogged');
    navigate(`/login`);
  };
  const handleUserActivity = () => {
    resetTimeout();
  };
  useEffect(() => {
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    resetTimeout();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, []);
  return (
    <>
      {showPopup ? (
        <>
          <Dialog
            // sx={{maxWidth:620}}
            open={open}
            onClose={handleClose}
          >
            <DialogTitle variant="h3" textAlign="center" id="alert-dialog-title">
              انتهت مده الجلسه
            </DialogTitle>
            <DialogContent>
              <img
                src={ExpiredIcon}
                alt=""
                width="300px"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={logout}>إنهاء الجلسة</Button>
              <Button variant="contained" onClick={handleClose}>
                استمرار الجلسة
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SessionTimeout;
