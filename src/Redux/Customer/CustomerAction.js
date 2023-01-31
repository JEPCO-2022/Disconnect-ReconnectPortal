import axios from "axios";
import cookie from "react-cookies";

// export const REQUEST_VehiclesLookup = "REQUEST_VehiclesLookup";
// export const SET_VehiclesLookup = "SET_VehiclesLookup";


// export const RequestEngineersDashBoard = (data) => {
//   return {
//   type: REQUEST_EngineersDashBoard,
//   };
// };
// // dahboard screen function الاحصائيات
// export const getDashboardData = (EngineersData) => async (dispatch) => {
//   dispatch(RequestEngineersDashBoard());
//   const userToken = await cookie.load("user");
//   if (userToken) {

//     const data = JSON.stringify({
//       "LanguageId": "AR",
//       "ComplaintDateStart": "",
//       "ComplaintDateEnd": "",
//       "ComplaintTimeStart": "",
//       "ComplaintTimeEnd": "",
//       "EmployeeNumber": "",
//       "piorityID": ""
//     });
    
//     const config = {
//       method: "post",
//       url: 'https://portal.jepco.com.jo:8080/EmergancyAppAPIs/EngineersDashBoard/GeneralTechnicianInf',
//       headers: {
//         Authorization: `Bearer ${userToken}`,
//         "Content-Type": "application/json",
//       },
//       data: JSON.stringify(EngineersData),
//     };

//     try {
//       const fileDataAPIResponce = await axios(config);
//       const fileData =fileDataAPIResponce.data.body
//       dispatch(setEngineersDashBoard(fileData));
//     } catch (error) {
//       console.log(error);
//        dispatch(errorEngineersDashBoard());

//     }
//   } else {
//     console.log("no Cookie");
//   }
// };

export const getCitiesLookup =()=>async (dispatch)=>{
const data = JSON.stringify({
  "LanguageId": "AR"
});

const config = {
  method: 'post',
  url: 'http://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/CitiesLookup',
  headers: { 
    'Authorization': `Bearer ${Token}`,
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

}
export const getBranchesLookup =(CityID)=> async (dispatch)=>{
const data = JSON.stringify({
  "LanguageId": "AR",
  "CitiyID": CityID
});

const config = {
  method: 'post',
  url: 'http://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/BranchesLookup',
  headers: { 
    'Authorization': `Bearer ${Token} `,
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

}
export const getAllUsers =()=>async (dispatch)=>{
  const data = JSON.stringify({
    "LanguageId": "AR"
  });
  
  const config = {
    method: 'post',
    url: 'http://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/UsersLookUp',
    headers: { 
      'Authorization': `Bearer ${Token}`,
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
}
export const userRegister =(Username,Password,Name,IsAdmin,CanExport)=>async (dispatch)=>{

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
    url: 'http://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/UserSiginUp',
    headers: { 
      'Authorization': `Bearer ${Token}`,
            'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
}
export const userUpdateInfo =(Username,Password,Name,IsAdmin,CanExport)=>async (dispatch)=>{

const data = {
  "LanguageId": "AR",
  "Username": "1313",
  "Password": "1313",
  "Name": "3",
  "IsAdmin": false,
  "CanExport": true}
;

const config = {
  method: 'post',
  url: 'http://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/UpdateUser',
  headers: { 
    'Authorization': `Bearer ${Token}`,
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
}
export const getTeamInfo =(TicketDate,OFFICE_NO,TRANSACTION_TYPE)=>async (dispatch)=>{
const data = {
  "LanguageId": "AR",
  "TicketDate":TicketDate,
  "OFFICE_NO": OFFICE_NO,
  "TRANSACTION_TYPE": TRANSACTION_TYPE
};

const config = {
  method: 'post',
  url: 'http://portal.jepco.com.jo/DisconnectionReconAppApi/DisconnectionAndConnectionDashBoard/GeneralTechnicianInf',
  headers: { 
    'Authorization': `Bearer ${Token}`,
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
}

