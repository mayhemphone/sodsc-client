import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SERVER_URL from '../constants/server';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleEmailChange = (e) => { this.setState({ email: e.target.value }); }

  handlePasswordChange = (e) => { this.setState({ password: e.target.value }); }

  handleSubmit = (e) => {
    e.preventDefault();
    // TODO: SEND DATA TO SERVER
    axios.post(`${SERVER_URL}/auth/login`, this.state)
    .then(response=>{
    	// console.log(response)
    	// take the token from the response and set it in
    	localStorage.setItem('serverToken', response.data.token)
    	// local storage update the user state info (in app,js)
    	this.props.getUser()

    })
    .catch((err) => {
        // console.log('Error in POST /auth/login', err)
      })
  }

  render() {
    if(localStorage.getItem('serverToken')){
      return (<Redirect to="/profile" />);
    }
    return(
        <div>
          <h2>Login as an existing user</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input name="Email" placeholder="What is your email?" value={this.state.email} onChange={this.handleEmailChange} />
            </div>
            <div>
              <input name="Password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
            </div>
            <input type="submit" value="Log Me In!" className="button" />
          </form>
        </div>
      );
  }
}

export default Login;
