import React from 'react';
import Topbar from './components/Topbar';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 64,
    height: '100%',
  },
  content: {
    height: '100%',
  },
}));

const MinimalLayout = props => {
  const { children } = props;

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Topbar />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default MinimalLayout;
