import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AppBar, FormGroup, FormControlLabel, Switch, Toolbar, CssBaseline, useScrollTrigger, Slide, Typography, IconButton, Menu, MenuItem } from '@material-ui/core/';
import {AccountCircle} from '@material-ui/icons/';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { resetUser } from '../App'




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


function NavContent() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const token = localStorage.getItem('serverToken') ? true : false

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleLogout (e) {
    e.preventDefault();
    // TODO: REMOVE LS TOKEN; UPDATE PARENT STATE
    // localStorage.removeItem('serverToken')
    resetUser()
    handleClose()
    
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/profile">Profile</Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link to="/add-merch">Add Merch</Link>
          </Typography>
          {token && (
            <div>
              <IconButton
                aria-label="Account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}><Link to="/add-merch">New Merch Item</Link></MenuItem>

                <MenuItem onClick={handleClose}><Link to="/profile">Profile</Link></MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                
              </Menu>
            </div>
          )}
          {!token && (
          	<React.Fragment>
	          	<Typography variant="h6" className={classes.title}>
	            	<Link to="/login">Login</Link>
	          	</Typography>
	          	<Typography variant="h6" className={classes.title}>
	            	<Link to="/signup">Signup</Link>
	          	</Typography>
	         	</React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}




class Nav extends Component {





	render() {
		return(
		<NavContent />
		)
	}
}
export default Nav;
