import isEmpty from 'lodash/isEmpty';

import { ADD_REDIRECT_ROUTE, CLEAR_REDIRECT_ROUTE } from '../actions/types';

const initialState = {
  location: {}
};

export default function route(state = initialState, action) {
  switch (action.type) {
    case ADD_REDIRECT_ROUTE:
      return {
        ...state,
        location: action.location
      };
    case CLEAR_REDIRECT_ROUTE:
      return initialState;
    default:
      return state;
  }
}
