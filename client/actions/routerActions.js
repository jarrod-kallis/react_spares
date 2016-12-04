import { ADD_REDIRECT_ROUTE, CLEAR_REDIRECT_ROUTE } from './types';

export function addRedirectRoute(location) {
  return {
    type: ADD_REDIRECT_ROUTE,
    location
  };
}

export function clearRedirectRoute() {
  return {
    type: CLEAR_REDIRECT_ROUTE
  };
}
