import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import TextFieldGroup from '../common/TextFieldGroup';
import { setCurrentUser } from '../../actions/authActions';
import { updateUserProfile } from '../../actions/userProfileActions';
// import { addFlashMessage, removeAllFlashMessages } from '../../actions/flashMessages';

class UserProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      firstName: '',
      surname: '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(props) {
    this.setState({
      ...this.props.user
    });
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.updateUserProfile(this.state).then(
      () => {
        // this.props.addFlashMessage({
        //   type: 'success',
        //   text: 'You have updated your user profile successfully.'
        // });

        toastr.success('You have updated your user profile successfully.');

        // setTimeout(() => {
        //   this.props.removeAllFlashMessages();
        // }, 5000);

        this.context.router.push('/');
      },
      (error) => {
        this.setState({
          errors: error.response ? error.response.data.error : error.message,
          isLoading: false
        });
      });
  }

  render() {
    const { id, firstName, surname, errors, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>User Profile</h1>

        { errors.form &&
          <div className='alert alert-danger'>{ errors.form }</div> }
        
        <TextFieldGroup
          label='First Name'
          name='firstName'
          value={firstName}
          onChange={this.onChange}
          error={errors.firstName}
        />

        <TextFieldGroup
          label='Surname'
          name='surname'
          value={surname}
          onChange={this.onChange}
          error={errors.surname}
        />

        <div className='form-group'>
          <button type='submit' disabled={isLoading} className='btn btn-primary btn-lg'>
            Save
          </button>
        </div>
      </form>
    );
  }
}

UserProfileForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  updateUserProfile: React.PropTypes.func.isRequired
  // addFlashMessage: React.PropTypes.func.isRequired,
  // removeAllFlashMessages: React.PropTypes.func.isRequired
};

UserProfileForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps, { updateUserProfile }/*, addFlashMessage, removeAllFlashMessages}*/)(UserProfileForm);
