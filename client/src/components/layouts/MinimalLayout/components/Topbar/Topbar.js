import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { makeStyles } from '@material-ui/core/styles';
import { Logo } from '../../../../tools';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));
const Topbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <Logo />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Topbar;
