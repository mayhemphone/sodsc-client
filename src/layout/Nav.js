import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, CssBaseline, useScrollTrigger, Slide, Typography, IconButton, MenuIcon, Menu, MenuItem } from '@material-ui/core/';
import {AccountCircle} from '@material-ui/icons/';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import NavContent from './NavContent'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  window: PropTypes.func,
};

class Nav extends Component {



  handleLogout = (e) => {
    e.preventDefault();
    // TODO: REMOVE LS TOKEN; UPDATE PARENT STATE
    localStorage.removeItem('serverToken')
    this.props.resetUser()
  }

//   render() {
//     let links = '';
//     if(this.props.user){
//       links = (
//           <span>
//             <a onClick={this.handleLogout}>Logout</a>
//             <Link to="/profile">Profile</Link>
//             <Link to="/add-merch">Add Merch</Link>
//           </span>
//         );
//     }
//     else {
//       links = (
//           <span>
//             <Typography variant="h6" >
//             	<Link to="/login">Log In</Link>
//           	</Typography>
//           	<Typography variant="h6" >
//             	<Link to="/signup">Sign Up</Link>
//            	</Typography>
//           </span>
//         );
//     }
//     return(
//         <React.Fragment>
//           <CssBaseline />
// 		      <HideOnScroll {...this.props}>
// 		        <AppBar>
// 		          <Toolbar>
// 		            <Link to="/">Home</Link>
// 		            {links}
// 		          </Toolbar>
// 		        </AppBar>
// 		      </HideOnScroll>
// 		      <Toolbar />

//         </React.Fragment>
//       );
//   }
// }

	render() {
		return(
		<NavContent />
		)
	}
}
export default Nav;
