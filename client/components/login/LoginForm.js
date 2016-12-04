import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import { login } from '../../actions/authActions';
import validateInput from '../../../shared/validations/login';
import TextFieldGroup from '../common/TextFieldGroup';
// import { addFlashMessage, removeAllFlashMessages } from '../../actions/flashMessages';
import { clearRedirectRoute } from '../../actions/routerActions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (isValid === false) {
      this.setState({
        errors: {
          ...this.state.errors,
          ...errors
        }
      });
    }

    return isValid;
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.isValid() === true) {
      this.setState({
        errors: {},
        isLoading: true
      });

      this.props.login(this.state).then(
        () => {
          // this.props.addFlashMessage({
          //   type: 'success',
          //   text: 'You have logged in successfully. Welcome!'
          // });

          toastr.success('You have logged in successfully. Welcome!');

          // setTimeout(() => {
          //   this.props.removeAllFlashMessages();
          // }, 5000);

          // Redirect the user to the home page or to the URL they originally tried to get to before being asked to log in
          let redirectRoute = this.context.store.getState().route.path || '/';
          this.context.router.push(redirectRoute);
          this.context.store.dispatch(clearRedirectRoute());
        },
        (error) => {
          this.setState({
            errors: error.response ? error.response.data.errors : error.message,
            isLoading: false
          });
        }
      );
    }
  }

  render() {
    const { identifier, password, errors, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        { errors.form &&
          <div className='alert alert-danger'>{ errors.form }</div> }
        
        <TextFieldGroup
          label='Username / Email'
          name='identifier'
          value={identifier}
          onChange={this.onChange}
          error={errors.identifier}
        />
        
        <TextFieldGroup
          label='Password'
          name='password'
          type='password'
          value={password}
          onChange={this.onChange}
          error={errors.password}
        />

        <div className='form-group'>
          <button type='submit' disabled={isLoading} className='btn btn-primary btn-lg'>
            Login
          </button>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired
  // addFlashMessage: React.PropTypes.func.isRequired,
  // removeAllFlashMessages: React.PropTypes.func.isRequired
};

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired
};

export default connect(null, { login }/*, addFlashMessage, removeAllFlashMessages }*/)(LoginForm);
