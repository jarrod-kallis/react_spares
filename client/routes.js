import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import SignUpPage from './components/signup/SignUpPage';
import LoginPage from './components/login/LoginPage';
import UserProfilePage from './components/user/UserProfilePage';
import requireAuth from './utils/requireAuth';

export default (
  <Route path='/' component={App}>
    {/* IndexRoute is a default route */}
    <IndexRoute component={Greetings}/>
    <Route path='signup' component={SignUpPage}/>
    <Route path='login' component={LoginPage}/>
    <Route path='userprofile' component={requireAuth(UserProfilePage)}/>
  </Route>
);
