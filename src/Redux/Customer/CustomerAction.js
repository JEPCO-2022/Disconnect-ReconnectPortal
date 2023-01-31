import axios from "axios";
import cookie from "react-cookies";

export const REQUEST_CitiesLookup = "REQUEST_CitiesLookup";
export const SET_CitiesLookup = "SET_CitiesLookup";
export const ERROR_CitiesLookup = "ERROR_CitiesLookup";

export const REQUEST_BranchesLookup = "REQUEST_BranchesLookup";
export const SET_BranchesLookup = "SET_BranchesLookup";
export const ERROR_BranchesLookup = "ERROR_BranchesLookup";

export const REQUEST_AllUsers = "REQUEST_AllUsers";
export const SET_AllUsers = "SET_AllUsers";
export const ERROR_AllUsers = "ERROR_AllUsers";

export const REQUEST_userRegister = "REQUEST_userRegister";
export const SET_userRegister = "SET_userRegister";
export const ERROR_userRegister = "ERROR_userRegister";

export const REQUEST_userUpdateInfo = "REQUEST_userUpdateInfo";
export const SET_userUpdateInfo = "SET_userUpdateInfo";
export const ERROR_userUpdateInfo = "ERROR_userUpdateInfo";

export const REQUEST_TeamInfo = "REQUEST_TeamInfo";
export const SET_TeamInfo = "SET_TeamInfo";
export const ERROR_TeamInfo = "ERROR_TeamInfo";

export const RequestCitiesLookup = (data) => {
  return {
  type: REQUEST_CitiesLookup,
  };
};
export const setCitiesLookup = (data) => {
  return {
    type: SET_CitiesLookup,
    payload: data,

  };
};
export const errorCitiesLookup = () => {
  return {
    type: ERROR_CitiesLookup,
  };
};

export const RequestBranchesLookup = (data) => {
  return {
  type: REQUEST_BranchesLookup,
  };
};
export const setBranchesLookup = (data) => {
  return {
    type: SET_BranchesLookup,
    payload: data,

  };
};
export const errorBranchesLookup = () => {
  return {
    type: ERROR_BranchesLookup,
  };
};

export const RequestAllUsers = (data) => {
  return {
  type: REQUEST_AllUsers,
  };
};
export const setAllUsers = (data) => {
  return {
    type: SET_AllUsers,
    payload: data,

  };
};
export const errorAllUsers = () => {
  return {
    type: ERROR_AllUsers,
  };
};

export const RequestuserRegister = (data) => {
  return {
  type: REQUEST_userRegister,
  };
};
export const setuserRegister = (data) => {
  return {
    type: SET_userRegister,
    payload: data,

  };
};
export const erroruserRegister = () => {
  return {
    type: ERROR_userRegister,
  };
};

export const RequestuserUpdateInfo = (data) => {
  return {
  type: REQUEST_userUpdateInfo,
  };
};
export const setuserUpdateInfo = (data) => {
  return {
    type: SET_userUpdateInfo,
    payload: data,

  };
};
export const erroruserUpdateInfo = () => {
  return {
    type: ERROR_userUpdateInfo,
  };
};

export const RequestTeamInfo = (data) => {
  return {
  type: REQUEST_TeamInfo,
  };
};
export const setTeamInfo = (data) => {
  return {
    type: SET_TeamInfo,
    payload: data,

  };
};
export const errorTeamInfo = () => {
  return {
    type: ERROR_TeamInfo,
  };
};



export const getCitiesLookup =()=>async (dispatch)=>{
  dispatch(RequestCitiesLookup());
  const userToken = await cookie.load("user");
  if (userToken) {

const data = JSON.stringify({
  "LanguageId": "AR"
});

const config = {
  method: 'post',
  url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/CitiesLookup',
  headers: { 
    'Authorization': `Bearer ${userToken}`,
    'Content-Type': 'application/json'
  },
  data : data
};

try {
  const fileDataAPIResponce = await axios(config);
  const fileData =fileDataAPIResponce.data.body
  dispatch(setCitiesLookup(fileData));
} catch (error) {
  console.log(error);
   dispatch(errorCitiesLookup());
}
} else {
  console.log("no Cookie");
}
};
export const getBranchesLookup =(CityID)=> async (dispatch)=>{
  dispatch(RequestBranchesLookup());
  const userToken = await cookie.load("user");
  if (userToken) {

const data = {
  "LanguageId": "AR",
  "CitiyID": CityID
};

const config = {
  method: 'post',
  url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/BranchesLookup',
  headers: { 
    'Authorization': `Bearer ${userToken} `,
    'Content-Type': 'application/json'
  },
  data : data
};

try {
  const fileDataAPIResponce = await axios(config);
  const fileData =fileDataAPIResponce.data.body
  dispatch(setBranchesLookup(fileData));
} catch (error) {
  console.log(error);
   dispatch(errorBranchesLookup());
}
} else {
  console.log("no Cookie");
}

}
export const getAllUsers =()=>async (dispatch)=>{
  dispatch(RequestAllUsers());
  const userToken = await cookie.load("user");
  if (userToken) {

  const data = {
    "LanguageId": "AR"
  };
  
  const config = {
    method: 'post',
    url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/UsersLookUp',
    headers: { 
      'Authorization': `Bearer ${userToken}`,
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  try {
    const fileDataAPIResponce = await axios(config);
    const fileData =fileDataAPIResponce.data.body
    dispatch(setAllUsers(fileData));
  } catch (error) {
    console.log(error);
     dispatch(errorAllUsers());
  }
  } else {
    console.log("no Cookie");
  }
}
export const userRegister =(Username,Password,Name,IsAdmin,CanExport)=>async (dispatch)=>{
  dispatch(RequestuserRegister());
  const userToken = await cookie.load("user");
  if (userToken) {

  const data = {
    "LanguageId": "AR",
    "Username": Username,
    "Password": Password,
    "Name": Name,
    "IsAdmin": IsAdmin,
    "CanExport": CanExport
  };
  
  const config = {
    method: 'post',
    url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/UserSiginUp',
    headers: { 
      'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
    },
    data : data
  };
  try {
    const fileDataAPIResponce = await axios(config);
    const fileData =fileDataAPIResponce.data.body
    dispatch(setuserRegister(fileData));
  } catch (error) {
    console.log(error);
     dispatch(erroruserRegister());
  }
  } else {
    console.log("no Cookie");
  }

}
export const userUpdateInfo =(Username,Password,Name,IsAdmin,CanExport)=>async (dispatch)=>{
  dispatch(RequestuserUpdateInfo());
  const userToken = await cookie.load("user");
  if (userToken) {

const data = {
  "LanguageId": "AR",
  "Username": "1313",
  "Password": "1313",
  "Name": "3",
  "IsAdmin": false,
  "CanExport": true
}
;

const config = {
  method: 'post',
  url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/UpdateUser',
  headers: { 
    'Authorization': `Bearer ${userToken}`,
    'Content-Type': 'application/json'
  },
  data : data
};

try {
  const fileDataAPIResponce = await axios(config);
  const fileData =fileDataAPIResponce.data.body
  dispatch(setuserUpdateInfo(fileData));
} catch (error) {
  console.log(error);
   dispatch(erroruserUpdateInfo());
}
} else {
  console.log("no Cookie");
}

}
export const getTeamInfo =()=>async (dispatch)=>{
  dispatch(RequestTeamInfo());
  const userToken = await cookie.load("user");
  if (userToken) {

const data = {
  "LanguageId": "AR",
  "TicketDate":"",
  "OFFICE_NO": "",
  "TRANSACTION_TYPE": ""
};

const config = {
  method: 'post',
  url: 'https://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/GeneralTechnicianInf',
  headers: { 
    'Authorization': `Bearer ${userToken}`,
    'Content-Type': 'application/json'
  },
  data : data
};

try {
  const fileDataAPIResponce = await axios(config);
  const fileData =fileDataAPIResponce.data.body
  dispatch(setTeamInfo(fileData));
} catch (error) {
  console.log(error);
   dispatch(errorTeamInfo());
}
} else {
  console.log("no Cookie");
}
}

// emergency portal can help you with this "if you need any help please get back to the same file in that application"