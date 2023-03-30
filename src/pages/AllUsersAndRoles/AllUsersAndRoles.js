// @mui
import { useState, useEffect } from 'react';
import { Card, Container, Divider, Grid, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, deleteUser } from '../../Redux/Customer/CustomerAction';

// hooks
import useSettings from '../../hooks/useSettings';

// components
import Page from '../../components/Page';
// ----------------------------------------------------------------------
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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function AllUsersAndRoles() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.Customer.AllUsers);
  const [search, setSearch] = useState('');
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const isLogged = localStorage.getItem('isLogged');
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event, id, fullName, username) => {
    setAnchorEl(event.currentTarget);
    setID(id);
    setName(fullName);
    setUserName(username);
  };
  const handleCloseDelete = () => {
    setAnchorEl(null);
    dispatch(deleteUser(id));
    window.location.reload(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (!(isLogged === 'true')) {
      localStorage.removeItem('user');
      localStorage.removeItem('userName');
      localStorage.removeItem('isAdmin');
      navigate('/login');
    }
    dispatch(getAllUsers());
  }, []);
  return (
    <Page title="المستخدمون والصلاحيات">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ display: 'flex', alignItems: 'center', p: 4, backgroundColor: '#EFEFEF' }}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6} lg={6}>
              <Typography variant="h4" component="h1" paragraph>
                المستخدمون والصلاحيات
              </Typography>
            </Grid>
            <Grid item xs={6} md={6} lg={6} textAlign="end">
              <Button
                endIcon={<PersonAddIcon />}
                className="nxt-btn-12-grid"
                variant="contained"
                fullwidth
                onClick={() => {
                  navigate('/dashboard/user/CreateNewUser');
                }}
              >
                إضافة مستخدم
              </Button>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider light />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                fullWidth
                placeholder="ابحث عن مستخدم "
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
            </Grid>
          </Grid>
        </Card>
        <br />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">الاسم الكامل</StyledTableCell>
                <StyledTableCell align="center">اسم المستخدم</StyledTableCell>
                <StyledTableCell align="center" />
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers
                .filter((item) => {
                  return search.toLowerCase() === ''
                    ? item
                    : item.name.toLowerCase().includes(search) || item.username.toLowerCase().includes(search);
                })

                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell align="center" component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <StyledTableCell align="center">{row.username}</StyledTableCell>

                      <StyledTableCell align="center">
                        <>
                          <Button
                            id="demo-customized-button"
                            // aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            // aria-expanded={open ? 'true' : undefined}
                            variant="contained"
                            disableElevation
                            onClick={(e) => {
                              handleClick(e, row.id, row.name, row.username);
                            }}
                            endIcon={<KeyboardArrowDownIcon />}
                          >
                            اختر إجراء
                          </Button>

                          <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                              'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                          >
                            <MenuItem
                              disableRipple
                              onClick={() => {
                                navigate(`/dashboard/EditUserInfo/${id}`, {
                                  state: { idNumber: id, fullName: name, username: userName },
                                });
                              }}
                            >
                              <EditIcon />
                              تعديل
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                navigate(`/dashboard/permission/${id}`, { state: { username: userName } });
                              }}
                              disableRipple
                            >
                              <FileCopyIcon />
                              الصلاحيات
                            </MenuItem>
                            <Divider sx={{ my: 0.5 }} />
                            <MenuItem onClick={() => handleCloseDelete()} disableRipple>
                              <ClearIcon />
                              حذف
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
      </Container>
    </Page>
  );
}
