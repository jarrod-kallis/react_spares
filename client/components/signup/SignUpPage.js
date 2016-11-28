import React from 'react';
import { connect } from 'react-redux';
import { userSignUpRequest, doesUserExist } from '../../actions/signUpActions';
import { login } from '../../actions/authActions';
import { addFlashMessage } from '../../actions/flashMessages';

import SignUpForm from './SignUpForm';

class SignUpPage extends React.Component {
  render() {
    const { userSignUpRequest, login, addFlashMessage, doesUserExist } = this.props;

    return (
      <div className='row'>
        <div className='col-md-4 col-md-offset-4'>
          <SignUpForm
            userSignUpRequest={userSignUpRequest}
            login={login}
            addFlashMessage={addFlashMessage}
            doesUserExist={doesUserExist}
          />
        </div>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  userSignUpRequest: React.PropTypes.func.isRequired,
  login: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  doesUserExist: React.PropTypes.func.isRequired
};

export default connect(null, { userSignUpRequest, login, addFlashMessage, doesUserExist })(SignUpPage);
