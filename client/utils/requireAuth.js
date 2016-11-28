import React from 'react';
import { connect } from 'react-redux';

import { addFlashMessage, removeAllFlashMessages } from '../actions/flashMessages';
import { addRedirectRoute } from '../actions/routerActions';

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (this.props.isAuthenticated === false) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Please login to access this page'
        });

        setTimeout(() => {
          this.props.removeAllFlashMessages();
        }, 5000);

        // Store URL that the user was trying to get to
        this.context.store.dispatch(addRedirectRoute(this.context.router.location.pathname));
        this.context.router.push('/login');
      }
    }

    // Will fire whenever the component needs to re-render eg. User clicks Logout
    componentWillUpdate(nextProps) {
      if (nextProps.isAuthenticated === false) {
        this.context.router.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent { ...this.props } />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    removeAllFlashMessages: React.PropTypes.func.isRequired
  };

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired,
    store: React.PropTypes.object.isRequired
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }

  return connect(mapStateToProps, { addFlashMessage, removeAllFlashMessages })(Authenticate);
}
