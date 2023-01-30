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
} from '@mui/material';
// hooks
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useState } from 'react';
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function CreateNewUser() {
  const { themeStretch } = useSettings();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Page title="إضافة مستخدم جديد">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          إضافة مستخدم جديد
        </Typography>
        <Card sx={{ display: 'flex', alignItems: 'center', p: 4, backgroundColor: '#EFEFEF' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              إضافة مستخدم جديد
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider light />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <TextField fullWidth label="الاسم الكامل" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <TextField fullWidth label="اسم المستخدم" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField fullWidth label="كلمة المرور" variant="outlined" />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">مشرف؟</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="female" control={<Radio />} label="نعم" />
                  <FormControlLabel value="male" control={<Radio />} label="لا" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={3}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">إمكانية استخراج الملفات</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="female" control={<Radio />} label="نعم" />
                  <FormControlLabel value="male" control={<Radio />} label="لا" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Button
                endIcon={<PersonAddIcon />}
                className="nxt-btn-12-grid"
                variant="contained"
                fullwidth
                onClick={handleClick}
              >
                إضافة
              </Button>
              {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message="تمت الإضافه بنجاح" /> */}
              <Snackbar open={open} autoHideDuration={1500} onClose={handleClose} message="تم التعديل بنجاح" />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
