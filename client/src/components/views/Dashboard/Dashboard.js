import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { SearchSales, LatestSales } from './components';
import { RoleManager } from '../../tools';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <RoleManager customReturn={<Redirect to='/orders' />}>
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <SearchSales></SearchSales>
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestSales></LatestSales>
          </Grid>
        </Grid>
      </div>
    </RoleManager>
  );
};

export default Dashboard;
