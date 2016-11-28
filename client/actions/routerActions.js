import { ADD_REDIRECT_ROUTE, CLEAR_REDIRECT_ROUTE } from './types';

export function addRedirectRoute(path) {
  return {
    type: ADD_REDIRECT_ROUTE,
    path
  };
}

export function clearRedirectRoute() {
  return {
    type: CLEAR_REDIRECT_ROUTE
  };
}
