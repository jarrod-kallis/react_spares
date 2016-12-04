import React from 'react';
import map from 'lodash/map';
// Allows conditional element class names
import classnames from 'classnames';
// Used for redirecting user after signing up
// import { browserHistory } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { toastr } from 'react-redux-toastr';

import timezones from '../../data/timezones';
import validateInput from '../../../shared/validations/signUp';
import TextFieldGroup from '../common/TextFieldGroup';
import toTitleCase from '../../utils/stringUtils';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  checkUserExists(event) {
    const name = event.target.name;
    const value = event.target.value;

    if (isEmpty(value) == false) {
      this.props.doesUserExist(value)
        .then((response) => {
          let errors = this.state.errors;

          if (response.data.user) {
            if (value === response.data.user[name]) {
              errors = {
                ...errors,
                [name]: name.toTitleCase() + ' already exists'
              };
            }
          } else {
            errors = {
              ...errors,
              [name]: ''
            };
          }

          this.setState({
            errors
          });
        });
    }
  }

  isValid() {
    // Clear the errors before seeing what's wrong
    // this.setState({
    //   errors: {}
    // });

    const { errors, isValid } = validateInput(this.state);

    if (isValid === false) {
      // Using a setTimeout here gives React time to update the errors state which is now clear
      // setTimeout(() => {
      this.setState({
        errors: {
          ...this.state.errors,
          ...errors
        }
      });
      // }, 1);
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

      this.props.userSignUpRequest(this.state).then(
        () => {
          let identifier = this.state.username;
          let password = this.state.password;

          this.props.login({ identifier, password }).then(
            () => {
              // this.props.addFlashMessage({
              //   type: 'success',
              //   text: 'You have signed up & been logged in successfully. Welcome!'
              // });

              toastr.success('You have signed up & been logged in successfully. Welcome!');

              // Redirect to home page
              // browserHistory.push('/');
              this.context.router.push('/');
            },
            (error) => {
              this.setState({
                errors: error.response ? error.response.data.errors : error.message,
                isLoading: false
              });
            }
          );
        },
        (error) => {
          this.setState({
            errors: error.response ? error.response.data : error.message,
            isLoading: false
          });
        }
      );
    }
  }

  render() {
    const { errors } = this.state;

    const timezoneOptions = map(timezones, (value, key) =>
      <option key={value} value={value}>{key}</option>
    );

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Sign up</h1>
        
        <TextFieldGroup
          label='Username'
          name='username'
          value={this.state.username}
          onChange={this.onChange}
          onExit={this.checkUserExists}
          error={errors.username}
        />
        
        <TextFieldGroup
          label='Email'
          name='email'
          value={this.state.email}
          onChange={this.onChange}
          onExit={this.checkUserExists}
          error={errors.email}
        />
        
        <TextFieldGroup
          label='Password'
          name='password'
          type='password'
          value={this.state.password}
          onChange={this.onChange}
          error={errors.password}
        />

        <TextFieldGroup
          label='Password Confirmation'
          name='passwordConfirmation'
          type='password'
          value={this.state.passwordConfirmation}
          onChange={this.onChange}
          error={errors.passwordConfirmation}
        />        
        
        <div className={classnames('form-group', { 'has-error': errors.timezone })}>
          <label className='control-label'>Timezone</label>
          <select
            name='timezone'
            className='form-control'
            value={this.state.timezone}
            onChange={this.onChange}
          >
            <option value='' disabled>Choose Your Timezone</option>
            {timezoneOptions}
          </select>
          {errors.timezone &&
            <span className='help-block'>{errors.timezone}</span>
          }
        </div>
        
        <div className='form-group'>
          <button type='submit' disabled={this.state.isLoading} className='btn btn-primary btn-lg'>
            Sign up
          </button>
        </div>
      </form>
    );
  }
}

SignUpForm.propTypes = {
  userSignUpRequest: React.PropTypes.func.isRequired,
  login: React.PropTypes.func.isRequired,
  // addFlashMessage: React.PropTypes.func.isRequired,
  doesUserExist: React.PropTypes.func.isRequired
};

SignUpForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default SignUpForm;
