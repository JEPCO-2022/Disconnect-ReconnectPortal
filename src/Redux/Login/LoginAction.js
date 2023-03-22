import axios from 'axios';
import * as jose from 'jose';
import cookie from 'react-cookies';

export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const REMOVE_USER_TOKEN = 'REMOVE_USER_TOKEN';
export const GET_USER_TOKEN = 'GET_USER_TOKEN';
export const SET_USER_INFO = 'SET_USER_INFO';

export const SET_LOGIN_REQ = 'SET_LOGIN_REQ';
export const SET_LOGIN_INFORMATION = 'SET_LOGIN_INFORMATION';
export const SET_LOGIN_ERR = 'SET_LOGIN_ERR';
export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';

export const setUserLogout = () => {
  return {
    type: REMOVE_USER_TOKEN,
  };
};

export const setLoginReq = () => {
  return {
    type: SET_LOGIN_REQ,
  };
};
export const setLoginErr = () => {
  return {
    type: SET_LOGIN_ERR,
  };
};
export const setLoginInformation = () => {
  return {
    type: SET_LOGIN_INFORMATION,
  };
};
export const setLoginSuccess = (username, userToken, canExport, isAdmin) => {
  // console.log({ username, userToken });
  return {
    type: SET_LOGIN_SUCCESS,
    payload: { username, userToken, canExport, isAdmin },
  };
};
export const userLogin = (username, password) => async (dispatch) => {
  dispatch(setLoginReq());

  const baseURL = 'https://portal.jepco.com.jo/DisconnectionReconAppApi/ApisLoginController/Login';
  const response = await axios.post(`${baseURL}`, {
    username: 'ConnectionAndDisconnectionAppIntegrationUser',
    password: 'ConnectionAndDisconnectionApp@jepco@123',
  });
  const infoBaseURL =
    'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/UserLogin';
  try {
    const genertedToken = response.data.body.token;
    const config = {
      method: 'post',
      url: infoBaseURL,
      headers: {
        Authorization: `Bearer ${genertedToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        Username: username,
        Password: password,
        LanguageId: 'AR',
      },
    };
    const user = jose.decodeJwt(genertedToken);
    cookie.save('user', genertedToken, { maxAge: 260000000 });
    cookie.save('userName', username, { maxAge: 260000000 });
    localStorage.setItem('user', genertedToken);
    localStorage.setItem('userName', username);
    const infoTokenResponse = await axios(config);
    console.log(infoTokenResponse.data.body);
    localStorage.setItem('isAdmin', infoTokenResponse.data.body.isAdmin);
    localStorage.setItem('canExport', infoTokenResponse.data.body.canExport);
    const filedata = infoTokenResponse.data.body;
    if (infoTokenResponse.data.statusCode) {
      console.log('no Cookie');
      dispatch(setLoginSuccess(username, genertedToken, filedata.canExport, filedata.isAdmin));
      dispatch(setLoginInformation(filedata));
    } else {
      console.log('login errorXO');
      dispatch(setLoginErr());
    }
  } catch (error) {
    dispatch(setLoginErr());
    if (error.response) {
      // Request made and server responded
      // console.log(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      // console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log('Error', error.message);
    }
  }
};
