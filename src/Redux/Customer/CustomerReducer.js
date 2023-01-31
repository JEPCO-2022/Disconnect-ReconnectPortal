// you can copy and paste the same file from emergency portal here
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  SET_CitiesLookup,
  SET_BranchesLookup,
  SET_AllUsers,
  SET_userRegister,
  SET_userUpdateInfo,
  SET_TeamInfo
} from './CustomerAction';

let initialState = {
  CitiesList: [],
  BranchesList: [],
  AllUsers: [],
  userRegister:[],
  userUpdateInfo:[],
  TeamInfo:[]
};

export default function CustomerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CitiesLookup:
      return {
        ...state,
        CitiesList: action.payload,
      };
      case SET_BranchesLookup:
        return {
          ...state,
          BranchesList: action.payload,
        };
        case SET_AllUsers:
          return {
            ...state,
            AllUsers: action.payload,
          };
          case SET_userRegister:
            return {
              ...state,
              userRegister: action.payload,
            };
            case SET_userUpdateInfo:
              return {
                ...state,
                userUpdateInfo: action.payload,
              };             
              case SET_TeamInfo:
                return {
                  ...state,
                  TeamInfo: action.payload,
                };
    
                default:
      return state;
  }
}
