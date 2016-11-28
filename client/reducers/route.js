import isEmpty from 'lodash/isEmpty';

import { ADD_REDIRECT_ROUTE, CLEAR_REDIRECT_ROUTE } from '../actions/types';

const initialState = {
  path: ''
};

export default function route(state = initialState, action) {
  switch (action.type) {
    case ADD_REDIRECT_ROUTE:
      return {
        ...state,
        path: action.path
      };
    case CLEAR_REDIRECT_ROUTE:
      return initialState;
    default:
      return state;
  }
}
