import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

// import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import route from './reducers/route';

export default combineReducers({
  // flashMessages,
  auth,
  route,
  toastr: toastrReducer
});
