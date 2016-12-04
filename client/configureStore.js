import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './rootReducer';

const configureStore = () => {
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

  return store;
};

export default configureStore;
