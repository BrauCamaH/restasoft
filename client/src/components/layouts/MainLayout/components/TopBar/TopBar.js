import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';

import axios from 'axios';
import logo from './resta_logo_texto.png';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
}));

const Topbar = props => {
  const { className, onSidebarOpen } = props;
  const { history } = props;
  const handleSignOut = () => {
    axios.delete('/api/auth//sign-out').catch(err => {
      console.log(err);
    });
    history.push('/sign-in');
  };

  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)}>
      <Toolbar>
        <Hidden lgUp>
          <IconButton color='inherit' onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <div className={classes.flexGrow}>
          <RouterLink to='/'>
            <img alt='Logo' width={125} height={50} src={logo} />
          </RouterLink>
        </div>
        <Tooltip title='SignOut'>
          <IconButton
            className={classes.signOutButton}
            onClick={handleSignOut}
            color='inherit'>
            <InputIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default withRouter(Topbar);
