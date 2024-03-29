import axios from 'axios';
import cookie from 'react-cookies';

export const requestCityLookup = 'requestCityLookup';
export const setCityLookup = 'setCityLookup';
export const errorCityLookup = 'errorCityLookup';

export const requestBrancheLookup = 'requestBrancheLookup';
export const setBrancheLookup = 'setBrancheLookup';
export const errorBrancheLookup = 'errorBrancheLookup';

export const requestUsersBranches = 'requestUsersBranches';
export const setUsersBranches = 'setUsersBranches';
export const errorUsersBranches = 'errorUsersBranches';

export const requestTeamLookup = 'requestTeamLookup';
export const setTeamLookup = 'setTeamLookup';
export const errorTeamLookup = 'errorTeamLookup';

export const requestAllUser = 'requestAllUser';
export const setAllUser = 'setAllUser';
export const errorAllUser = 'errorAllUser';

export const requestusersRegister = 'requestusersRegister';
export const setusersRegister = 'setusersRegister';
export const errorusersRegister = 'errorusersRegister';

export const requestusersUpdateInfo = 'requestusersUpdateInfo';
export const setusersUpdateInfo = 'setusersUpdateInfo';
export const errorusersUpdateInfo = 'errorusersUpdateInfo';

export const requestTeamsInfo = 'requestTeamsInfo';
export const setTeamsInfo = 'setTeamsInfo';
export const errorTeamsInfo = 'errorTeamsInfo';

export const requestMeterReportByTeams = 'requestMeterReportByTeams';
export const setMeterReportByTeams = 'setMeterReportByTeams';
export const errorMeterReportByTeams = 'errorMeterReportByTeams';

export const requestDeleteUsers = 'requestDeleteUsers';
export const setDeleteUsers = 'setDeleteUsers';
export const errorDeleteUsers = 'errorDeleteUsers';

export const requestticketsDetails = 'requestticketsDetails';
export const setticketsDetails = 'setticketsDetails';
export const errorticketsDetails = 'errorticketsDetails';

export const requestaddUserBranch = 'requestaddUserBranch';
export const setaddUserBranch = 'setaddUserBranch';
export const erroraddUserBranch = 'erroraddUserBranch';

export const requestallUserBranch = 'requestallUserBranch';
export const setalluserBranch = 'setalluserBranch';
export const errorallUserBranch = 'errorallUserBranch';

export const requestEngineerAbandonedDecision = 'requestEngineerAbandonedDecision';
export const setengineerAbandonedDecision = 'setengineerAbandonedDecision';
export const errorengineerAbandonedDecision = 'errorengineerAbandonedDecision';

export const requestsaveEngineerAbandonedDecision = 'requestsaveEngineerAbandonedDecision';
export const setsaveEngineerAbandonedDecision = 'setsaveEngineerAbandonedDecision';
export const errorsaveEngineerAbandonedDecision = 'errorsaveEngineerAbandonedDecision';

export const requestMaintenanceAndVigilanceReport = 'requestMaintenanceAndVigilanceReport';
export const setmaintenanceAndVigilanceReport = 'setmaintenanceAndVigilanceReport';
export const errormaintenanceAndVigilanceReport = 'errormaintenanceAndVigilanceReport';

export const requestStatusOfDisconnectionTicketsReport = 'requestStatusOfDisconnectionTicketsReport';
export const setstatusOfDisconnectionTicketsReport = 'setstatusOfDisconnectionTicketsReport';
export const errorstatusOfDisconnectionTicketsReport = 'errorstatusOfDisconnectionTicketsReport';

export const requestClearAll = 'requestClearAll';
export const setclearAll = 'setclearAll';
export const errorclearAll = 'errorclearAll';

export const requestRolesLookUp = 'requestRolesLookUp';
export const setRolesLookUp = 'setRolesLookUp';
export const errorRolesLookUp = 'errorRolesLookUp';

export const requestGarandelReport = 'requestGarandelReport';
export const setgarandelReport = 'setgarandelReport';
export const errorgarandelReport = 'errorgarandelReport';

export const requestGarandelDetailedReport = 'requestGarandelDetailedReport';
export const setgarandelDetailedReport = 'setgarandelDetailedReport';
export const errorgarandelDetailedReport = 'errorgarandelDetailedReport';

export const CLEAR_PERSISTED_STATE = 'CLEAR_PERSISTED_STATE';

export const RequestCitiesLookup = () => {
  return {
    type: requestCityLookup,
  };
};
export const setCitiesLookup = (data) => {
  return {
    type: setCityLookup,
    payload: data,
  };
};
export const errorCitiesLookup = () => {
  return {
    type: errorCityLookup,
  };
};

export const requestTeamsLookup = () => {
  return {
    type: requestTeamLookup,
  };
};
export const setTeamsLookup = (data) => {
  return {
    type: setTeamLookup,
    payload: data,
  };
};
export const errorTeamsLookup = () => {
  return {
    type: errorTeamLookup,
  };
};

export const RequestBranchesLookup = () => {
  return {
    type: requestBrancheLookup,
  };
};
export const setBranchesLookup = (data) => {
  return {
    type: setBrancheLookup,
    payload: data,
  };
};
export const errorBranchesLookup = () => {
  return {
    type: errorBrancheLookup,
  };
};

export const RequestAllUsers = () => {
  return {
    type: requestAllUser,
  };
};
export const setAllUsers = (data) => {
  return {
    type: setAllUser,
    payload: data,
  };
};
export const errorAllUsers = () => {
  return {
    type: errorAllUser,
  };
};

export const RequestuserRegister = () => {
  return {
    type: requestusersRegister,
  };
};
export const setuserRegister = (data) => {
  return {
    type: setusersRegister,
    payload: data,
  };
};
export const erroruserRegister = () => {
  return {
    type: errorusersRegister,
  };
};

export const RequestuserUpdateInfo = () => {
  return {
    type: requestusersUpdateInfo,
  };
};
export const setuserUpdateInfo = (data) => {
  return {
    type: setusersUpdateInfo,
    payload: data,
  };
};
export const erroruserUpdateInfo = () => {
  return {
    type: errorusersUpdateInfo,
  };
};

export const RequestTeamInfo = () => {
  return {
    type: requestTeamsInfo,
  };
};
export const setTeamInfo = (data) => {
  return {
    type: setTeamsInfo,
    payload: data,
  };
};
export const errorTeamInfo = () => {
  return {
    type: errorTeamsInfo,
  };
};

export const RequestMeterReportByTeam = () => {
  return {
    type: requestMeterReportByTeams,
  };
};
export const setMeterReportByTeam = (data) => {
  return {
    type: setMeterReportByTeams,
    payload: data,
  };
};
export const errorMeterReportByTeam = () => {
  return {
    type: errorMeterReportByTeams,
  };
};

export const RequestDeleteUser = () => {
  return {
    type: requestDeleteUsers,
  };
};
export const setDeleteUser = (data) => {
  return {
    type: setDeleteUsers,
    payload: data,
  };
};
export const errorDeleteUser = () => {
  return {
    type: errorDeleteUsers,
  };
};

export const RequestUserBranches = () => {
  return {
    type: requestUsersBranches,
  };
};
export const setUserBranches = (data) => {
  return {
    type: setUsersBranches,
    payload: data,
  };
};
export const errorUserBranches = () => {
  return {
    type: errorUsersBranches,
  };
};

export const RequestTicketsDetails = () => {
  return {
    type: requestticketsDetails,
  };
};
export const setTicketsDetails = (data) => {
  return {
    type: setticketsDetails,
    payload: data,
  };
};
export const errorTicketsDetails = () => {
  return {
    type: errorticketsDetails,
  };
};

export const RequestAddUserBranch = () => {
  return {
    type: requestaddUserBranch,
  };
};
export const setAddUserBranch = (data) => {
  return {
    type: setaddUserBranch,
    payload: data,
  };
};
export const errorAddUserBranch = () => {
  return {
    type: erroraddUserBranch,
  };
};

export const RequestAllUserBranch = () => {
  return {
    type: requestallUserBranch,
  };
};
export const setAllUserBranch = (data) => {
  return {
    type: setalluserBranch,
    payload: data,
  };
};
export const errorAllUserBranch = () => {
  return {
    type: errorallUserBranch,
  };
};

export const RequestEngineerAbandonedDecision = () => {
  return {
    type: requestEngineerAbandonedDecision,
  };
};
export const setEngineerAbandonedDecision = (data) => {
  return {
    type: setengineerAbandonedDecision,
    payload: data,
  };
};
export const errorEngineerAbandonedDecision = () => {
  return {
    type: errorengineerAbandonedDecision,
  };
};

export const RequestSaveEngineerAbandonedDecision = () => {
  return {
    type: requestsaveEngineerAbandonedDecision,
  };
};
export const setSaveEngineerAbandonedDecision = (data) => {
  return {
    type: setsaveEngineerAbandonedDecision,
    payload: data,
  };
};
export const errorSaveEngineerAbandonedDecision = () => {
  return {
    type: errorsaveEngineerAbandonedDecision,
  };
};

export const RequestClearAll = () => {
  return {
    type: requestClearAll,
  };
};
export const setClearAll = (data) => {
  return {
    type: setclearAll,
    payload: data,
  };
};
export const errorClearAll = () => {
  return {
    type: errorclearAll,
  };
};

export const RequestMaintenanceAndVigilanceReport = () => {
  return {
    type: requestMaintenanceAndVigilanceReport,
  };
};
export const setMaintenanceAndVigilanceReport = (data) => {
  return {
    type: setmaintenanceAndVigilanceReport,
    payload: data,
  };
};
export const errorMaintenanceAndVigilanceReport = () => {
  return {
    type: errormaintenanceAndVigilanceReport,
  };
};
export const RequestStatusOfDisconnectionTicketsReport = () => {
  return {
    type: requestStatusOfDisconnectionTicketsReport,
  };
};
export const setStatusOfDisconnectionTicketsReport = (data) => {
  return {
    type: setstatusOfDisconnectionTicketsReport,
    payload: data,
  };
};
export const errorStatusOfDisconnectionTicketsReport = () => {
  return {
    type: errorstatusOfDisconnectionTicketsReport,
  };
};

export const RequestRolesLookUp = () => {
  return {
    type: requestRolesLookUp,
  };
};
export const setRoleLookUp = (data) => {
  return {
    type: setRolesLookUp,
    payload: data,
  };
};
export const errorRoleLookUp = () => {
  return {
    type: errorRolesLookUp,
  };
};

export const RequestGarandelReport = () => {
  return {
    type: requestGarandelReport,
  };
};
export const setGarandelReport = (data) => {
  return {
    type: setgarandelReport,
    payload: data,
  };
};
export const errorGarandelReport = () => {
  return {
    type: errorgarandelReport,
  };
};

export const RequestGarandelDetailedReport = () => {
  return {
    type: requestGarandelDetailedReport,
  };
};
export const setGarandelDetailedReport = (data) => {
  return {
    type: setgarandelDetailedReport,
    payload: data,
  };
};
export const errorGarandelDetailedReport = () => {
  return {
    type: errorgarandelDetailedReport,
  };
};

export const getCitiesLookup = () => async (dispatch) => {
  dispatch(RequestCitiesLookup());
  // const userToken = await cookie.load('user');
  const baseURL = 'https://portal.jepco.com.jo/DisconnectionReconAppApi/ApisLoginController/Login';
  const response = await axios.post(`${baseURL}`, {
    username: 'ConnectionAndDisconnectionAppIntegrationUser',
    password: 'ConnectionAndDisconnectionApp@jepco@123',
  });
  const genertedToken = response.data.body.token;
  if (genertedToken) {
    const Data = JSON.stringify({
      LanguageId: 'AR',
    });

    const config = {
      method: 'post',
      url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/CitiesLookup',
      headers: {
        Authorization: `Bearer ${genertedToken}`,
        'Content-Type': 'application/json',
      },
      data: Data,
    };

    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      dispatch(setCitiesLookup(fileData));
    } catch (error) {
      dispatch(errorCitiesLookup());
    }
  } else {
    console.log('no Cookie');
  }
};
export const getBranchesLookup = (CityID, username, isadmin) => async (dispatch) => {
  dispatch(RequestBranchesLookup());
  // const userToken = await cookie.load('user');
  const baseURL = 'https://portal.jepco.com.jo/DisconnectionReconAppApi/ApisLoginController/Login';
  const response = await axios.post(`${baseURL}`, {
    username: 'ConnectionAndDisconnectionAppIntegrationUser',
    password: 'ConnectionAndDisconnectionApp@jepco@123',
  });
  const genertedToken = response.data.body.token;
  if (genertedToken) {
    const Data = {
      LanguageId: 'AR',
      CitiyID: CityID,
      UserName: username,
      IsAdmin: isadmin,
    };

    const config = {
      method: 'post',
      url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/BranchesLookup',
      headers: {
        Authorization: `Bearer ${genertedToken} `,
        'Content-Type': 'application/json',
      },
      data: Data,
    };

    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;

      dispatch(setBranchesLookup(fileData));
    } catch (error) {
      console.log(error);
      dispatch(errorBranchesLookup());
    }
  } else {
    console.log('no Cookie');
  }
};
export const getCitiesLookupAllCities = () => async (dispatch) => {
  dispatch(RequestCitiesLookup());
  // const userToken = await cookie.load('user');
  const baseURL = 'https://portal.jepco.com.jo/DisconnectionReconAppApi/ApisLoginController/Login';
  const response = await axios.post(`${baseURL}`, {
    username: 'ConnectionAndDisconnectionAppIntegrationUser',
    password: 'ConnectionAndDisconnectionApp@jepco@123',
  });
  const genertedToken = response.data.body.token;
  if (genertedToken) {
    const Data = JSON.stringify({
      LanguageId: 'AR',
    });

    const config = {
      method: 'post',
      url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/CitiesLookup',
      headers: {
        Authorization: `Bearer ${genertedToken}`,
        'Content-Type': 'application/json',
      },
      data: Data,
    };

    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      fileData.unshift({ id: 99, cityName: 'جميع المحافظات', languageID: 'AR' });
      dispatch(setCitiesLookup(fileData));
    } catch (error) {
      dispatch(errorCitiesLookup());
    }
  } else {
    console.log('no Cookie');
  }
};
export const getBranchesLookupAllBranches = (CityID, username, isadmin) => async (dispatch) => {
  dispatch(RequestBranchesLookup());
  // const userToken = await cookie.load('user');
  const baseURL = 'https://portal.jepco.com.jo/DisconnectionReconAppApi/ApisLoginController/Login';
  const response = await axios.post(`${baseURL}`, {
    username: 'ConnectionAndDisconnectionAppIntegrationUser',
    password: 'ConnectionAndDisconnectionApp@jepco@123',
  });
  const genertedToken = response.data.body.token;
  if (genertedToken) {
    const Data = {
      LanguageId: 'AR',
      CitiyID: CityID,
      UserName: username,
      IsAdmin: isadmin,
    };

    const config = {
      method: 'post',
      url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/BranchesLookup',
      headers: {
        Authorization: `Bearer ${genertedToken} `,
        'Content-Type': 'application/json',
      },
      data: Data,
    };

    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      fileData.unshift({ branchID: 0, branchName: 'جميع المكاتب', languageID: 'AR' });
      dispatch(setBranchesLookup(fileData));
    } catch (error) {
      console.log(error);
      dispatch(errorBranchesLookup());
    }
  } else {
    console.log('no Cookie');
  }
};
export const getTeamsLookup = (BranchID) => async (dispatch) => {
  BranchID = BranchID.toString();
  dispatch(requestTeamsLookup());
  // const userToken = await cookie.load('user');
  const baseURL = 'https://portal.jepco.com.jo/DisconnectionReconAppApi/ApisLoginController/Login';
  const response = await axios.post(`${baseURL}`, {
    username: 'ConnectionAndDisconnectionAppIntegrationUser',
    password: 'ConnectionAndDisconnectionApp@jepco@123',
  });
  const genertedToken = response.data.body.token;
  if (genertedToken) {
    const Data = {
      LanguageId: 'AR',
      OFFICE_NO: BranchID,
    };

    const config = {
      method: 'post',
      url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/GetTeamsByOffice',
      headers: {
        Authorization: `Bearer ${genertedToken} `,
        'Content-Type': 'application/json',
      },
      data: Data,
    };
    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      dispatch(setTeamsLookup(fileData));
    } catch (error) {
      console.log(error);
      dispatch(errorTeamsLookup());
    }
  } else {
    console.log('no Cookie');
  }
};
export const getAllUsers = () => async (dispatch) => {
  dispatch(RequestAllUsers());
  // const userToken = await cookie.load('user');
  const baseURL = 'https://portal.jepco.com.jo/DisconnectionReconAppApi/ApisLoginController/Login';
  const response = await axios.post(`${baseURL}`, {
    username: 'ConnectionAndDisconnectionAppIntegrationUser',
    password: 'ConnectionAndDisconnectionApp@jepco@123',
  });
  const genertedToken = response.data.body.token;
  if (genertedToken) {
    const Data = {
      LanguageId: 'AR',
    };
    const config = {
      method: 'post',
      url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/UsersLookUp',
      headers: {
        Authorization: `Bearer ${genertedToken}`,
        'Content-Type': 'application/json',
      },
      data: Data,
    };
    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      dispatch(setAllUsers(fileData));
    } catch (error) {
      console.log(error);
      dispatch(errorAllUsers());
    }
  } else {
    console.log('no Cookie');
  }
};
export const userRegister = (userName, password, fullName, isAdmin, canExport, role) => async (dispatch) => {
  dispatch(RequestuserRegister());
  // const userToken = await cookie.load('user');
  const baseURL = 'https://portal.jepco.com.jo/DisconnectionReconAppApi/ApisLoginController/Login';
  const response = await axios.post(`${baseURL}`, {
    username: 'ConnectionAndDisconnectionAppIntegrationUser',
    password: 'ConnectionAndDisconnectionApp@jepco@123',
  });
  const genertedToken = response.data.body.token;
  if (genertedToken) {
    const Data = {
      LanguageId: 'AR',
      Username: userName,
      Password: password,
      Name: fullName,
      IsAdmin: isAdmin,
      CanExport: canExport,
      Role: role,
    };

    const config = {
      method: 'post',
      url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/UserSiginUp',
      headers: {
        Authorization: `Bearer ${genertedToken}`,
        'Content-Type': 'application/json',
      },
      data: Data,
    };
    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      // const fileData = fileDataAPIResponce.data.status;

      dispatch(setuserRegister(fileData));
    } catch (error) {
      console.log(error);
      dispatch(erroruserRegister());
    }
  } else {
    console.log('no Cookie');
  }
};
export const userUpdateInfo = (UserId, password, name, isAdmin, canExport, role) => async (dispatch) => {
  dispatch(RequestuserUpdateInfo());
  // const userToken = await cookie.load('user');
  const baseURL = 'https://portal.jepco.com.jo/DisconnectionReconAppApi/ApisLoginController/Login';
  const response = await axios.post(`${baseURL}`, {
    username: 'ConnectionAndDisconnectionAppIntegrationUser',
    password: 'ConnectionAndDisconnectionApp@jepco@123',
  });
  const genertedToken = response.data.body.token;
  if (genertedToken) {
    const Data = {
      LanguageId: 'AR',
      UserID: UserId,
      Password: password,
      Name: name,
      IsAdmin: isAdmin,
      CanExport: canExport,
      Role: role,
    };
    const config = {
      method: 'post',
      url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/UpdateUser',
      headers: {
        Authorization: `Bearer ${genertedToken}`,
        'Content-Type': 'application/json',
      },
      data: Data,
    };

    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      dispatch(setuserUpdateInfo(fileData));
    } catch (error) {
      console.log(error);
      dispatch(erroruserUpdateInfo());
    }
  } else {
    console.log('no Cookie');
  }
};
export const getTeamInfo = (EngineersData) => async (dispatch) => {
  dispatch(RequestTeamInfo());
  // const userToken = await cookie.load('user');
  const baseURL = 'https://portal.jepco.com.jo/DisconnectionReconAppApi/ApisLoginController/Login';
  const response = await axios.post(`${baseURL}`, {
    username: 'ConnectionAndDisconnectionAppIntegrationUser',
    password: 'ConnectionAndDisconnectionApp@jepco@123',
  });
  const genertedToken = response.data.body.token;
  if (genertedToken) {
    const data = {
      LanguageId: 'AR',
      TicketDate: '',
      OFFICE_NO: '',
      Cities_NO: '',
      TRANSACTION_TYPE: '',
      isAdminBoolean: true,
      TicketDateFrom: '',
      TicketDateTO: '',
    };

    const config = {
      method: 'post',
      url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/GeneralTechnicianInf',
      headers: {
        Authorization: `Bearer ${genertedToken}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(EngineersData),
    };

    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      dispatch(setTeamInfo(fileData));
    } catch (error) {
      console.log(error);
      dispatch(errorTeamInfo());
    }
  } else {
    console.log('no Cookie');
  }
};
export const getMeterReportByTeam = (EngineersData) => async (dispatch) => {
  dispatch(RequestMeterReportByTeam());
  // const userToken = await cookie.load('user');
  const baseURL = 'https://portal.jepco.com.jo/DisconnectionReconAppApi/ApisLoginController/Login';
  const response = await axios.post(`${baseURL}`, {
    username: 'ConnectionAndDisconnectionAppIntegrationUser',
    password: 'ConnectionAndDisconnectionApp@jepco@123',
  });
  const genertedToken = response.data.body.token;
  if (genertedToken) {
    const config = {
      method: 'post',
      url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/MeterReportByTeam',
      headers: {
        Authorization: `Bearer ${genertedToken}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(EngineersData),
    };

    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      dispatch(setMeterReportByTeam(fileData));
    } catch (error) {
      console.log(error);
      dispatch(errorMeterReportByTeam());
    }
  } else {
    console.log('no Cookie');
  }
};
export const deleteUser = (UserId) => async (dispatch) => {
  dispatch(RequestDeleteUser());
  // const userToken = await cookie.load('user');
  const baseURL = 'https://portal.jepco.com.jo/DisconnectionReconAppApi/ApisLoginController/Login';
  const response = await axios.post(`${baseURL}`, {
    username: 'ConnectionAndDisconnectionAppIntegrationUser',
    password: 'ConnectionAndDisconnectionApp@jepco@123',
  });
  const genertedToken = response.data.body.token;
  if (genertedToken) {
    const Data = {
      LanguageId: 'AR',
      UserID: UserId,
    };

    const config = {
      method: 'post',
      url: `https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/DeleteUser`,
      headers: {
        Authorization: `Bearer ${genertedToken}`,
        'Content-Type': 'application/json',
      },
      data: Data,
    };

    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      dispatch(setDeleteUser(fileData));
    } catch (error) {
      console.log(error);
      dispatch(errorDeleteUser());
    }
  } else {
    console.log('no Cookie');
  }
};
export const getUserBranches = (userName) => async (dispatch) => {
  dispatch(RequestUserBranches());
  // const userToken = await cookie.load('user');
  const baseURL = 'https://portal.jepco.com.jo/DisconnectionReconAppApi/ApisLoginController/Login';
  const response = await axios.post(`${baseURL}`, {
    username: 'ConnectionAndDisconnectionAppIntegrationUser',
    password: 'ConnectionAndDisconnectionApp@jepco@123',
  });
  const genertedToken = response.data.body.token;
  if (genertedToken) {
    const Data = {
      LanguageId: 'AR',
      Username: userName,
    };

    const config = {
      method: 'post',
      url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/GetUserBranches',
      headers: {
        Authorization: `Bearer ${genertedToken} `,
        'Content-Type': 'application/json',
      },
      data: Data,
    };

    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      dispatch(setUserBranches(fileData));
    } catch (error) {
      console.log(error);
      dispatch(errorUserBranches());
    }
  } else {
    console.log('no Cookie');
  }
};
export const getTicketsDetails = (ticketsID) => async (dispatch) => {
  dispatch(RequestTicketsDetails());
  // const userToken = await cookie.load('user');
  const baseURL = 'https://portal.jepco.com.jo/DisconnectionReconAppApi/ApisLoginController/Login';
  const response = await axios.post(`${baseURL}`, {
    username: 'ConnectionAndDisconnectionAppIntegrationUser',
    password: 'ConnectionAndDisconnectionApp@jepco@123',
  });
  const genertedToken = response.data.body.token;
  if (genertedToken) {
    const Data = {
      LanguageId: 'AR',
      TicketsID: ticketsID,
    };

    const config = {
      method: 'post',
      url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/TicketsDetails',
      headers: {
        Authorization: `Bearer ${genertedToken} `,
        'Content-Type': 'application/json',
      },
      data: Data,
    };

    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      dispatch(setTicketsDetails(fileData));
    } catch (error) {
      console.log(error);
      dispatch(errorTicketsDetails());
    }
  } else {
    console.log('no Cookie');
  }
};

export const ClearAllUserBranch = () => async (dispatch) => {
  dispatch(setClearAll([]));
};
export const addUserBranches = (userName, userBranchesList) => async (dispatch) => {
  dispatch(RequestAddUserBranch());
  // const userToken = await cookie.load('user');
  const baseURL = 'https://portal.jepco.com.jo/DisconnectionReconAppApi/ApisLoginController/Login';
  const response = await axios.post(`${baseURL}`, {
    username: 'ConnectionAndDisconnectionAppIntegrationUser',
    password: 'ConnectionAndDisconnectionApp@jepco@123',
  });
  const genertedToken = response.data.body.token;
  if (genertedToken) {
    const Data = {
      LanguageId: 'AR',
      Username: userName,
      UserBranchesList: userBranchesList,
    };
    const config = {
      method: 'post',
      url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/AddUserBranches',
      headers: {
        Authorization: `Bearer ${genertedToken}`,
        'Content-Type': 'application/json',
      },
      data: Data,
    };
    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      dispatch(setAddUserBranch(fileData));
    } catch (error) {
      console.log(error);
      dispatch(errorTicketsDetails());
    }
  } else {
    console.log('no Cookie');
  }
};

export const getEngineerAbandonedDecision = (Startdate, Enddate, officeNumber, teamNumber) => async (dispatch) => {
  dispatch(RequestEngineerAbandonedDecision());
  // const userToken = await cookie.load('user');
  const baseURL = 'https://portal.jepco.com.jo/DisconnectionReconAppApi/ApisLoginController/Login';
  const response = await axios.post(`${baseURL}`, {
    username: 'ConnectionAndDisconnectionAppIntegrationUser',
    password: 'ConnectionAndDisconnectionApp@jepco@123',
  });
  const genertedToken = response.data.body.token;
  if (genertedToken) {
    const Data = {
      LanguageId: 'AR',
      StartDate: Startdate,
      EndDate: Enddate,
      OFFICE_NO: officeNumber,
      TEAM_NO: teamNumber,
    };

    const config = {
      method: 'post',
      url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/EngineerAbandonedDecision',
      headers: {
        Authorization: `Bearer ${genertedToken}`,
        'Content-Type': 'application/json',
      },
      data: Data,
    };

    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      dispatch(setEngineerAbandonedDecision(fileData));
    } catch (error) {
      console.log(error);
      dispatch(errorEngineerAbandonedDecision());
    }
  } else {
    console.log('no Cookie');
  }
};

export const SaveEngineerAbandonedDecision =
  (abandonedTicketID, notArrivedStatuesID, engineerUserName, engineerID) => async (dispatch) => {
    dispatch(RequestSaveEngineerAbandonedDecision());
    // const userToken = await cookie.load('user');
    const baseURL = 'https://portal.jepco.com.jo/DisconnectionReconAppApi/ApisLoginController/Login';
    const response = await axios.post(`${baseURL}`, {
      username: 'ConnectionAndDisconnectionAppIntegrationUser',
      password: 'ConnectionAndDisconnectionApp@jepco@123',
    });
    const genertedToken = response.data.body.token;
    if (genertedToken) {
      const Data = {
        LanguageId: 'AR',
        AbandonedTicketID: abandonedTicketID,
        NotArrivedStatuesID: notArrivedStatuesID,
        EngineerUserName: engineerUserName,
        EngineerID: engineerID,
      };

      const config = {
        method: 'post',
        url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/SaveEngineerAbandonedDecision',
        headers: {
          Authorization: `Bearer ${genertedToken}`,
          'Content-Type': 'application/json',
        },
        data: Data,
      };

      try {
        const fileDataAPIResponce = await axios(config);
        const fileData = fileDataAPIResponce.data.body;
        dispatch(setSaveEngineerAbandonedDecision(fileData));
      } catch (error) {
        console.log(error);
        dispatch(errorengineerAbandonedDecision());
      }
    } else {
      console.log('no Cookie');
    }
  };

export const StatusOfDisconnectionTicketsReport =
  (ticketDateFrom, ticketDateTO, cityNumber, officeNumber, userName, isAdmin, StatusId) => async (dispatch) => {
    dispatch(RequestStatusOfDisconnectionTicketsReport());
    // const userToken = await cookie.load('user');
    const baseURL = 'https://portal.jepco.com.jo/DisconnectionReconAppApi/ApisLoginController/Login';
    const response = await axios.post(`${baseURL}`, {
      username: 'ConnectionAndDisconnectionAppIntegrationUser',
      password: 'ConnectionAndDisconnectionApp@jepco@123',
    });
    const genertedToken = response.data.body.token;
    if (genertedToken) {
      const Data = {
        LanguageId: 'AR',
        TicketDateFrom: ticketDateFrom,
        TicketDateTO: ticketDateTO,
        Cities_NO: cityNumber,
        OFFICE_NO: officeNumber,
        UserName: userName,
        IsAdmin: isAdmin,
        StatusID: StatusId,
      };
      const config = {
        method: 'post',
        url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/StatusOfDisconnectionTicketsReport',
        headers: {
          Authorization: `Bearer ${genertedToken}`,
          'Content-Type': 'application/json',
        },
        data: Data,
      };

      try {
        const fileDataAPIResponce = await axios(config);
        const fileData = fileDataAPIResponce.data.body;
        dispatch(setStatusOfDisconnectionTicketsReport(fileData));
      } catch (error) {
        console.log(error);
        dispatch(errorStatusOfDisconnectionTicketsReport());
      }
    } else {
      console.log('no Cookie');
    }
  };
export const getMaintenanceAndVigilanceReport =
  (Startdate, Enddate, officeNumber, teamNumber, type) => async (dispatch) => {
    dispatch(RequestMaintenanceAndVigilanceReport());
    // const userToken = await cookie.load('user');
    const baseURL = 'https://portal.jepco.com.jo/DisconnectionReconAppApi/ApisLoginController/Login';
    const response = await axios.post(`${baseURL}`, {
      username: 'ConnectionAndDisconnectionAppIntegrationUser',
      password: 'ConnectionAndDisconnectionApp@jepco@123',
    });
    const genertedToken = response.data.body.token;
    if (genertedToken) {
      const Data = {
        LanguageId: 'AR',
        StartDate: Startdate,
        EndDate: Enddate,
        OFFICE_NO: officeNumber,
        TEAM_NO: teamNumber,
        ReportType: type,
      };

      const config = {
        method: 'post',
        url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/MaintenanceAndVigilanceReport/GetMaintenanceAndVigilanceReport',
        headers: {
          Authorization: `Bearer ${genertedToken}`,
          'Content-Type': 'application/json',
        },
        data: Data,
      };

      try {
        const fileDataAPIResponce = await axios(config);
        const fileData = fileDataAPIResponce.data.body;
        dispatch(setMaintenanceAndVigilanceReport(fileData));
      } catch (error) {
        console.log(error);
        dispatch(errorMaintenanceAndVigilanceReport());
      }
    } else {
      console.log('no Cookie');
    }
  };
export const rolesLookUp = () => async (dispatch) => {
  dispatch(RequestRolesLookUp());
  const baseURL = 'https://portal.jepco.com.jo/DisconnectionReconAppApi/ApisLoginController/Login';
  const response = await axios.post(`${baseURL}`, {
    username: 'ConnectionAndDisconnectionAppIntegrationUser',
    password: 'ConnectionAndDisconnectionApp@jepco@123',
  });
  const genertedToken = response.data.body.token;
  if (genertedToken) {
    const Data = {
      LanguageId: 'AR',
    };
    const config = {
      method: 'post',
      url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/RolesLookup',
      headers: {
        Authorization: `Bearer ${genertedToken}`,
        'Content-Type': 'application/json',
      },
      data: Data,
    };

    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      console.log();
      dispatch(setRoleLookUp(fileData));
    } catch (error) {
      console.log(error);
      dispatch(errorRoleLookUp());
    }
  } else {
    console.log('no Cookie');
  }
};
export const getGarandelReport = (Data) => async (dispatch) => {
  dispatch(RequestGarandelReport());
  // const userToken = await cookie.load('user');
  const baseURL = 'https://portal.jepco.com.jo/DisconnectionReconAppApi/ApisLoginController/Login';
  const response = await axios.post(`${baseURL}`, {
    username: 'ConnectionAndDisconnectionAppIntegrationUser',
    password: 'ConnectionAndDisconnectionApp@jepco@123',
  });
  const genertedToken = response.data.body.token;
  if (genertedToken) {
    const config = {
      method: 'post',
      url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/DiscoReconReportFromSAP',
      headers: {
        Authorization: `Bearer ${genertedToken}`,
        'Content-Type': 'application/json',
      },
      data: Data,
    };

    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      dispatch(setGarandelReport(fileData));
    } catch (error) {
      console.log(error);
      dispatch(errorGarandelReport());
    }
  } else {
    console.log('no Cookie');
  }
};
export const getGarandelDetailedReport = (Data) => async (dispatch) => {
  dispatch(RequestGarandelDetailedReport());
  // const userToken = await cookie.load('user');
  const baseURL = 'https://portal.jepco.com.jo/DisconnectionReconAppApi/ApisLoginController/Login';
  const response = await axios.post(`${baseURL}`, {
    username: 'ConnectionAndDisconnectionAppIntegrationUser',
    password: 'ConnectionAndDisconnectionApp@jepco@123',
  });
  const genertedToken = response.data.body.token;
  if (genertedToken) {
    const config = {
      method: 'post',
      url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/DiscoReconDetailsReportFromSAP',
      headers: {
        Authorization: `Bearer ${genertedToken}`,
        'Content-Type': 'application/json',
      },
      data: Data,
    };

    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      dispatch(setGarandelDetailedReport(fileData));
    } catch (error) {
      console.log(error);
      dispatch(errorGarandelDetailedReport());
    }
  } else {
    console.log('no Cookie');
  }
};
export const clearPersistedState = () => ({ type: CLEAR_PERSISTED_STATE });
// emergency portal can help you with this "if you need any help please get back to the same file in that application"
