import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

class Greetings extends React.Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;

    let displayUser = '';

    if (isEmpty(user) === false) {
      displayUser = isEmpty(user.firstName) === false ? user.firstName : user.username;
    }

    return (
      <div className='jumbotron'>
        <h1>{ isAuthenticated === true ? `Hi ${displayUser}` : `Login or Sign up to get started`}</h1>
      </div>
    );
  }
}

// Greetings.contextTypes = {
//   state: React.PropTypes.object.isRequired
// };

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Greetings);
