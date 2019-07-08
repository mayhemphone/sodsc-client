import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Profile extends Component {
  render() {
    if(localStorage.getItem('serverToken')){
      return (
          <div>
            <h2>Hello again, {this.props.user.name}!</h2>
            <h4>Your email is {this.props.user.email}</h4>
          </div>
        );
    }
    return(
      <div>
        <p>This is a profile page. You must be logged in to see it.</p>
        <p>Would you like to <Link to="/login">Log In</Link> or <Link to="/signup">Sign up</Link>?</p>
      </div>
      );
  }
}

export default Profile;
