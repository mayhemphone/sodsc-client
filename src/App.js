import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import SERVER_URL from './constants/server';
import './App.css';
import Footer from './layout/Footer';
import Home from './Home';
import Login from './auth/Login';
import Nav from './layout/Nav';
import Profile from './Profile';
import Signup from './auth/Signup';
import AddMerch from './AddMerch'


  function resetUser () {
	
	let token = localStorage.getItem('serverToken')
	if (token) {
		localStorage.removeItem('serverToken')
		alert('logged out')
		// this.setState({ user: null })
	}
  }

class App extends Component {
  constructor(props){
	super(props);
	this.state = {
	  user: null
	}
  }

  componentDidMount = () => {
	// GET USER INFO
	this.getUser()
  }



  getUser = () => {
	// SEE IF THERE'S A TOKEN
	// IF THERE IS, TRY TO GET USER INFO
	let token = localStorage.getItem('serverToken')
	if (token){
		axios.post(`${SERVER_URL}/auth/current/user`,{
			headers: {
				'Authorization': `Bearer ${token}` 
			}
		})
		.then(response=>{
			console.log(response)
			this.setState({ user: response.data.user })
		})
		.catch((err) => {
			console.log('Error in POST /signup', err)
			this.resetUser() 
		})
	} else {
		console.log(('No token'))
	}
  }

  render() {
	return (
	  <div className="App">
		<Router>
		  <div>
			<Nav user={this.state.user} resetUser={this.resetUser}/>

			<Route exact path="/" component={Home} />
			<Route path="/login" component={
			  () => (<Login user={this.state.user} getUser={this.getUser} />)
			} />
			<Route path="/signup" component={
			  () => (<Signup user={this.state.user} getUser={this.getUser}/>)
			} />
			<Route path="/profile" component={
			  () => (<Profile user={this.state.user} />)
			} />
			
			<Route path="/add-merch" component={
			  () => (<AddMerch user={this.state.user} />)
			} />
		
		  </div>
		</Router>
		{/*<Footer />*/}
	  </div>
	);
  }
}

export default App;

export {
	resetUser
}
