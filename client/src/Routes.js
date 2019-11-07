import {
  SingIn,
  SingUp,
  Tables,
  Categories,
  Products,
  Account,
  Clients,
  Sales,
} from './components/views';
import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout, WithAuth } from './components/tools';
import { MinimalLayout, MainLayout } from './components/layouts';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from='/' to='/sign-in' />
      <RouteWithLayout
        component={SingUp}
        exact
        layout={MinimalLayout}
        path='/sign-up'
      />
      <RouteWithLayout
        component={SingIn}
        exact
        layout={MinimalLayout}
        path='/sign-in'
      />
      <RouteWithLayout
        component={WithAuth(Account)}
        exact
        layout={WithAuth(MainLayout)}
        path='/account'
      />
      <RouteWithLayout
        component={WithAuth(Tables)}
        exact
        layout={WithAuth(MainLayout)}
        path='/tables'
      />
      <RouteWithLayout
        component={WithAuth(Categories)}
        exact
        layout={WithAuth(MainLayout)}
        path='/categories'
      />
      <RouteWithLayout
        component={WithAuth(Products)}
        exact
        layout={WithAuth(MainLayout)}
        path='/products/:category'
      />
      <RouteWithLayout
        component={WithAuth(Clients)}
        exact
        layout={WithAuth(MainLayout)}
        path='/clients'
      />
      <RouteWithLayout
        component={WithAuth(Sales)}
        exact
        layout={WithAuth(MainLayout)}
        path='/orders'
      />
    </Switch>
  );
};

export default Routes;
