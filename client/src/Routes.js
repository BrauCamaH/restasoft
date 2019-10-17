import { SingIn, SingUp, Tables, Categories } from './components/views';
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
        component={WithAuth(Tables)}
        exact
        layout={MainLayout}
        path='/tables'
      />
      <RouteWithLayout
        component={WithAuth(Categories)}
        exact
        layout={MainLayout}
        path='/products'
      />
    </Switch>
  );
};

export default Routes;
