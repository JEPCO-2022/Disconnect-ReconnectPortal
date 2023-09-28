import { useEffect, useState } from 'react';
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
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SessionTimeout from './SessionTimeout';
import { addUserBranches, getUserBranches, ClearAllUserBranch } from '../Redux/Customer/CustomerAction';
import useSettings from '../hooks/useSettings';

const objectOfArrayCities = [];
const objectOfArrayBranch = [];
let defalutBranchesChescked = [];
const newArrayOfObjectBranch = [];
const newArrayOfObjectCities = [];
let count = 0;
let ammanOfices = {};
let asaltOfices = {};
let alzarqaOfices = {};
let madabaOfices = {};
export default function PageEight() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [productsArray, setProductsArray] = useState([]);
  const [values, setValues] = useState([]);
  const [ref, setRef] = useState(true);
  const { themeStretch } = useSettings();
  const userBracnch = useSelector((state) => state.Customer.UserBracnch);
  const allUserBranch = useSelector((state) => state.Customer.alluserBranch);
  const location = useLocation();
  const isLogged = localStorage.getItem('isLogged');
  const userName = location.state.username;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!(isLogged === 'true')) {
      localStorage.removeItem('user');
      localStorage.removeItem('userName');
      localStorage.removeItem('isAdmin');
      navigate('/login');
    }
    refresh();
    dispatch(getUserBranches(userName));
    dispatch(ClearAllUserBranch());
  }, [ref]);

  function refresh() {
    if (window.localStorage) {
      if (!localStorage.getItem('reload')) {
        localStorage.reload = true;
        window.location.reload();
      } else {
        localStorage.removeItem('reload');
      }
    }
  }
  const data = userBracnch.branchesLookupList;
  defalutBranchesChescked = userBracnch.userBranchesList;
  if (data === undefined || data === null) {
    return 0;
  }
  const handleClose = () => {
    setOpen(false);
  };
  function arrOfices(e) {
    switch (e) {
      case 1:
        ammanOfices = data[e - 1].branchesListForCity;
        return ammanOfices;
      case 2:
        alzarqaOfices = data[e - 1].branchesListForCity;
        return alzarqaOfices;
      case 3:
        asaltOfices = data[e - 1].branchesListForCity;
        return asaltOfices;
      case 4:
        madabaOfices = data[e - 1].branchesListForCity;
        return madabaOfices;
      default:
        break;
    }
    return 0;
  }
  function city(e) {
    switch (e) {
      case 1:
        return 'عمان';
      case 2:
        return 'الزرقاء';
      case 3:
        return 'السلط';
      case 4:
        return 'مادبا';
      default:
        break;
    }
    return 0;
  }
  function checedkCheckBox(bool, branchid, cityid) {
    if (!bool) {
      for (let index = 0; index < objectOfArrayBranch.length; index += 1) {
        if (!(objectOfArrayBranch[index].BranchID === branchid)) {
          for (let index = 0; index < newArrayOfObjectBranch.length; index += 1) {
            if (newArrayOfObjectBranch[index].BranchID === branchid) return;
          }
          newArrayOfObjectBranch.push({ BranchID: branchid });
          newArrayOfObjectCities.push({ CitiyID: cityid });
        }
      }
    } else {
      for (let index = 0; index < objectOfArrayCities.length; index += 1) {
        if (objectOfArrayBranch[index].BranchID === branchid) return 0;
      }
      objectOfArrayCities[count] = { CitiyID: cityid };
      objectOfArrayBranch[count] = { BranchID: branchid };
      count += 1;
    }
  }
  function handleSend() {
    const results = objectOfArrayBranch.filter(
      ({ BranchID: id1 }) => !newArrayOfObjectBranch.some(({ BranchID: id2 }) => id2 === id1)
    );
    const results2 = objectOfArrayCities.filter(
      ({ CitiyID: id1 }) => !newArrayOfObjectCities.some(({ CitiyID: id2 }) => id2 === id1)
    );
    const userName = location.state.username;
    const mearged = [];
    for (let index = 0; index < objectOfArrayCities.length; index += 1) {
      mearged.push({ ...results[index], ...results2[index] });
    }
    dispatch(addUserBranches(userName, mearged));

    setOpen(true);
    setTimeout(() => {
      navigate(`/dashboard/AllUsersAndRoles`);
    }, 2000);
  }

  function boolCheckedDefalut(branchid, cityid) {
    for (let index = 0; index < objectOfArrayBranch.length; index += 1) {
      if (objectOfArrayBranch[index].BranchID === branchid) {
        return 0;
      }
    }
    objectOfArrayCities[count] = { CitiyID: cityid };
    objectOfArrayBranch[count] = { BranchID: branchid };
    count += 1;
    return true;
  }
  function defaultChecked(branchid, cityid) {
    if (defalutBranchesChescked.length === 0) {
      return false;
    }
    for (let index = 0; index < defalutBranchesChescked.length; index += 1) {
      if (defalutBranchesChescked[index].branchCode === branchid) {
        if (boolCheckedDefalut(branchid, cityid)) return true;
      }
    }
    return false;
  }
  return (
    <>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          المكاتب
        </Typography>
        <Card sx={{ display: 'flex', alignItems: 'center', p: 4, backgroundColor: '#EFEFEF' }}>
          <Grid container spacing={2}>
            {data.map((cities) => (
              <Grid item xs={12} sm={6} lg={3} md={4} key={cities.cityID}>
                <FormControl fullWidth>
                  <FormLabel>
                    <Typography>{city(cities.cityID)}</Typography>
                  </FormLabel>
                  {arrOfices(cities.cityID).map((branches) => (
                    <FormGroup key={branches.branchID}>
                      <FormControlLabel
                        label={branches.branchName}
                        control={
                          <Checkbox
                            value={values}
                            color={'primary'}
                            defaultChecked={defaultChecked(branches.branchID, cities.cityID)}
                            onChange={(e) => {
                              setValues(branches.branchID);
                              checedkCheckBox(e.target.checked, branches.branchID, cities.cityID);
                            }}
                          />
                        }
                      />
                    </FormGroup>
                  ))}
                </FormControl>
              </Grid>
            ))}
            <Grid textAlign="end" item xs={12} sm={12} lg={12} md={12}>
              <Button
                variant="contained"
                onClick={() => {
                  handleSend();
                }}
              >
                حفظ
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
      <Snackbar open={open} autoHideDuration={4000} severity="success" onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          تمت الإرسال بنجاح
        </Alert>
      </Snackbar>
      <SessionTimeout />
    </>
  );
}
