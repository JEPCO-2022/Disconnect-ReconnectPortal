// you can copy and paste the same file from emergency portal here
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  setCityLookup,
  setBrancheLookup,
  setAllUser,
  setusersRegister,
  setaddUserBranch,
  setusersUpdateInfo,
  setTeamsInfo,
  setMeterReportByTeams,
  setDeleteUsers,
  setTeamLookup,
  setUsersBranches,
  setticketsDetails,
  setalluserBranch,
  setclearAll,
  setengineerAbandonedDecision,
  setsaveEngineerAbandonedDecision,
} from './CustomerAction';

const initialState = {
  CitiesList: [],
  BranchesList: [],
  TeamList: [],
  AllUsers: [],
  userRegister: [],
  userUpdateInfo: [],
  TeamInfo: [],
  MeterReportByTeam: [],
  DeleteUser: [],
  UserBracnch: [],
  AllAbandoned: [],
  TicketsData: [],
  UsersBranches: [],
  alluserBranch: [],
  engineerAbandonedDecision: [],
  clearAll: [],
};

const CustomerReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case setclearAll:
      return {
        ...state,
        clearAll: action.payload,
      };
    case setengineerAbandonedDecision:
      return {
        ...state,
        AllAbandoned: action.payload,
      };
    case setsaveEngineerAbandonedDecision:
      return {
        ...state,
        engineerAbandonedDecision: action.payload,
      };
    case setalluserBranch:
      return {
        ...state,
        alluserBranch: action.payload,
      };
    case setticketsDetails:
      return {
        ...state,
        TicketsData: action.payload,
      };
    case setaddUserBranch:
      return {
        ...state,
        UsersBranches: action.payload,
      };
    case setUsersBranches:
      return {
        ...state,
        UserBracnch: action.payload,
      };
    case setCityLookup:
      return {
        ...state,
        CitiesList: action.payload,
      };
    case setBrancheLookup:
      return {
        ...state,
        BranchesList: action.payload,
      };
    case setTeamLookup:
      return {
        ...state,
        TeamList: action.payload,
      };
    case setAllUser:
      return {
        ...state,
        AllUsers: action.payload,
      };
    case setusersRegister:
      return {
        ...state,
        userRegister: action.payload,
      };
    case setusersUpdateInfo:
      return {
        ...state,
        userUpdateInfo: action.payload,
      };
    case setTeamsInfo:
      return {
        ...state,
        TeamInfo: action.payload,
      };
    case setMeterReportByTeams:
      return {
        ...state,
        MeterReportByTeam: action.payload,
      };
    case setDeleteUsers:
      return {
        ...state,
        DeleteUser: action.payload,
      };

    default:
      return state;
  }
};

export default CustomerReducer;
