// @mui
import { Button, Card, Container, Divider, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
// hooks
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function EditUserInfo() {
  const { themeStretch } = useSettings();


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
              <TextField fullWidth label="الاسم الكامل" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <TextField fullWidth label="اسم المستخدم" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField fullWidth label="كلمة المرور" variant="outlined" />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
            <FormControl >
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
            <FormControl >
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
            <Grid  item xs={12} md={6} lg={6}>
        <Button endIcon={<ModeEditOutlineIcon/>}  className="nxt-btn-12-grid" variant="contained" fullwidth >
              تعديل
            </Button>
          </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
