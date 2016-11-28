import axios from 'axios';

import { setCurrentUser } from './authActions';

export function updateUserProfile(userData) {
  return dispatch => {
    return axios.put('/api/users/update', userData)
      .then(response => {
        dispatch(setCurrentUser(response.data.user));
      });
  };
}
