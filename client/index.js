import React from 'react';
import { render } from 'react-dom';
// import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';

import setAuthorisationToken from './utils/setAuthorisationToken';
import { setCurrentUser } from './actions/authActions';
import configureStore from './configureStore';
import Root from './components/Root';

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorisationToken(localStorage.jwtToken);
  // store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render(
  // To understand React JSX, install preset 'babel-preset-react' in .babelrc
  <Root store={store}/>,
  document.getElementById('app')
);
