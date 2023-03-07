import {
  SET_USER_TOKEN,
  REMOVE_USER_TOKEN,
  SET_USER_INFO,
  SET_LOGIN_ERR,
  SET_LOGIN_REQ,
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
        isAdmin:action.payload.isAdmin,
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
