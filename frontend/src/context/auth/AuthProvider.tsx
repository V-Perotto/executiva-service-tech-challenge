import { useCallback, useEffect, useReducer } from 'react';
import axios from 'axios';

import setAuthToken from '../../utils/SetAuthToken';
import {
  REGISTER_USER,
  LOGIN_USER,
  GET_USER,
  AUTH_FAIL,
  SET_LOADING,
  CLEAR_ERROR,
  LOGOUT_USER,
} from '../types';
import AuthReducer from './AuthReducer';
import AuthContext from './AuthContext';
import { User } from '../../types/user';

const AuthProvider = (props: any) => {
  const initialState = {
    user: null,
    loading: false,
    isRegistered: false,
    isAuthenticated: false,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const url = import.meta.env.VITE_BACKEND_URL;

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('Nenhum token encontrado, abortando loadUser');
      return;
    }

    setAuthToken(token);
    dispatch({ type: SET_LOADING });

    try {
      const res = await axios.get(`${url}/user/auth`);
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } catch (err: any) {
      dispatch({ 
        type: AUTH_FAIL,
        payload: err.response?.data?.error || 'Erro ao carregar usuário' 
      });
    }
  }, [dispatch, url]);

  const register = async (user: User) => {
    try {
      dispatch({ type: SET_LOADING });
      const config = { headers: { 'Content-Type': 'application/json' } };
      const res = await axios.post(`${url}/user/register`, user, config);

      dispatch({ type: REGISTER_USER, payload: res.data });
      
      await loadUser();
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Erro ao registrar usuário';
      dispatch({ type: AUTH_FAIL, payload: errorMsg });
      throw new Error(errorMsg);
    }
  };

  const login = async (user: User) => {
    try {
      dispatch({ type: SET_LOADING });
      const config = { headers: { 'Content-Type': 'application/json' } };
      const res = await axios.post(`${url}/user/login`, user, config);

      dispatch({ type: LOGIN_USER, payload: res.data });

      await loadUser();
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Erro ao fazer login';
      dispatch({ type: AUTH_FAIL, payload: errorMsg });
      throw new Error(errorMsg);
    }
  };

  const logout = () => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: LOGOUT_USER });
  };

  const clearError = () => dispatch({ type: CLEAR_ERROR });

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <AuthContext.Provider
      value={{
        loading: state.loading,
        user: state.user,
        isRegistered: state.isRegistered,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        register,
        login,
        logout,
        loadUser,
        clearError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
