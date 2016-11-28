import axios from 'axios';
import setAuthorisationToken from '../utils/setAuthorisationToken';
// import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';

import { SET_CURRENT_USER } from './types';

export function login(data) {
  return dispatch => {
    return axios.post('/api/auth', data)
      .then(response => {
        const token = response.data.token;

        localStorage.setItem('jwtToken', token);
        setAuthorisationToken(token);

        // dispatch(setCurrentUser(jwt.decode(token)));
        dispatch(setCurrentUser(jwtDecode(token)));
      });
  };
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorisationToken(false);
    dispatch(setCurrentUser({}));
  };
}
