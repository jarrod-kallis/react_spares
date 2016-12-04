import React from 'react';
import { render } from 'react-dom';
// browserHistory removes hashes from the URL (making it cleaner)
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
// import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import ReduxToastr from 'react-redux-toastr';

import routes from './routes';
import rootReducer from './rootReducer';
import setAuthorisationToken from './utils/setAuthorisationToken';
import { setCurrentUser } from './actions/authActions';

const store = createStore(
  // Dummy reducer
  // (state = {}) => state,
  rootReducer,
  compose(
    applyMiddleware(thunk),
    // If we have Chrome's Redux DevTool Extension then initialise it (Redux DevTools)
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.jwtToken) {
  setAuthorisationToken(localStorage.jwtToken);
  // store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render(
  // To understand React JSX install preset 'babel-preset-react' in .babelrc
  <Provider store={store}>
    <div>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates={true}
        position='top-left'
        transitionIn='fadeIn'
        transitionOut='fadeOut'
        progressBar
      />

      <Router
        history={browserHistory}
        routes={routes}
      />
    </div>
  </Provider>,
  document.getElementById('app')
);
