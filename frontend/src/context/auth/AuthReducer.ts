import setAuthToken from '../../utils/SetAuthToken';
import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  GET_USER,
  AUTH_FAIL,
  CLEAR_ERROR,
} from '../types';

export default (state: any, action: any) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

     case REGISTER_USER:
      if (action.payload?.token) {
        localStorage.setItem('token', action.payload.token);
        setAuthToken(action.payload.token);
      }
      return {
        ...state,
        isRegistered: true,
        isAuthenticated: !!action.payload?.token,
        loading: false,
      };

    case LOGIN_USER:
      if (action.payload?.token) {
        localStorage.setItem('token', action.payload.token);
        setAuthToken(action.payload.token);
      }
      return {
        ...state,
        isAuthenticated: !!action.payload?.token,
        loading: false,
        error: action.payload?.token ? null : action.payload?.error,
      };

    case LOGOUT_USER:
    case AUTH_FAIL:
      localStorage.removeItem('token');
      setAuthToken('');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload ?? null,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};