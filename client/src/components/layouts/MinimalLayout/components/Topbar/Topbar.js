import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';


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
          <Typography variant='h6' noWrap>
            RestaSotf
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Topbar;
