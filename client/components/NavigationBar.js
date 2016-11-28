import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { logout } from '../actions/authActions';

class NavigationBar extends React.Component {
  logout(event) {
    event.preventDefault();

    this.props.logout();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    let displayUser = '';

    if (isEmpty(user) === false) {
      displayUser = isEmpty(user.firstName) === false ? user.firstName : user.username;
    }

    const userLinks = (
      <ul className='nav navbar-nav navbar-right'>
        <li>
          <label style={{ paddingTop:'15px' }}>Hi {displayUser}</label>
        </li>
        <li><Link to='/userprofile'>User Profile</Link></li>
        <li><a href='#' onClick={this.logout.bind(this)}>Logout</a></li>
      </ul>
    );

    const guestLinks = (
      <ul className='nav navbar-nav navbar-right'>
        <li><Link to='/signup'>Sign up</Link></li>
        <li><Link to='/login'>Login</Link></li>
      </ul>
    );

    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <Link to='/' className='navbar-brand'>Spares Master</Link>
          </div>

          <div className='collapse navbar-collapse'>
            { isAuthenticated === true ? userLinks : guestLinks }
          </div>
        </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
