import {
  SET_USER_TOKEN,
  REMOVE_USER_TOKEN,
  SET_USER_INFO,
  SET_LOGIN_ERR,
  SET_LOGIN_REQ,
  SET_LOGIN_INFORMATION,
  SET_LOGIN_SUCCESS,
} from './LoginAction';

export default function loginReducer(
  state = {
    userInfo: {},
    userToken: '',
    infoToken: '',
    userName: '',
    isLogged: false,
    isError: false,
    FullName: '',
    canExport: false,
    isAdmin: false,
  },
  action = {}
) {
  switch (action.type) {
    case SET_LOGIN_ERR:
      return {
        ...state,
        userName: '',
        userToken: '',
        isError: true,
        isLogged: false,
      };
    case SET_LOGIN_REQ:
      return {
        ...state,
        userName: '',
        userToken: '',
        isError: false,
        isLogged: false,
        FullName: '',
      };
    case SET_LOGIN_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        userName: action.payload.username,
        userToken: action.payload.userToken,
        isError: false,
        isLogged: true,
        FullName: action.payload.fullName,
        canExport: action.payload.canExport,
        isAdmin: action.payload.isAdmin,
      };
    case SET_LOGIN_INFORMATION:
      return {
        ...state,
        loginInfo: action.payload,
      };

    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case SET_USER_TOKEN:
      return {
        ...state,
        userToken: action.payload.userToken,
      };
    case REMOVE_USER_TOKEN:
      return {
        userInfo: {},
        userToken: '',
        infoToken: '',
      };

    default:
      return state;
  }
}
