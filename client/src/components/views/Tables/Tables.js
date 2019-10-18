import React from 'react';
import { MaterialTable } from './components';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
  },
}));

const Table = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MaterialTable classes={classes}></MaterialTable>
    </div>
  );
};

export default Table;
