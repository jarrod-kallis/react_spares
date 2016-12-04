import React from 'react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
// browserHistory removes hashes from the URL (making it cleaner)
import { Router, browserHistory } from 'react-router';

import routes from '../routes';

const Root = ({ store }) => (
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
  </Provider>
);

export default Root;
