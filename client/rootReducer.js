import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import route from './reducers/route';

export default combineReducers({
  flashMessages,
  auth,
  route
});
