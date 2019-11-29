import {
  SingIn,
  Tables,
  Categories,
  Products,
  Account,
  Clients,
  Sales,
  Dashboard,
  UserList,
} from './components/views';
import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components/tools';
import { MinimalLayout, MainLayout } from './components/layouts';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from='/' to='/dashboard' />
      <RouteWithLayout
        component={SingIn}
        exact
        layout={MinimalLayout}
        path='/sign-in'
      />
      <RouteWithLayout
        isRestricted
        component={Dashboard}
        exact
        layout={MainLayout}
        path='/dashboard'
      />
      <RouteWithLayout
        isRestricted
        component={UserList}
        exact
        layout={MainLayout}
        path='/users'
      />
      <RouteWithLayout
        isRestricted
        component={Account}
        exact
        layout={MainLayout}
        path='/account'
      />
      <RouteWithLayout
        isRestricted
        component={Tables}
        exact
        layout={MainLayout}
        path='/tables'
      />
      <RouteWithLayout
        isRestricted
        component={Categories}
        exact
        layout={MainLayout}
        path='/categories'
      />
      <RouteWithLayout
        isRestricted
        component={Products}
        exact
        layout={MainLayout}
        path='/products/:category'
      />
      <RouteWithLayout
        isRestricted
        component={Clients}
        exact
        layout={MainLayout}
        path='/clients'
      />
      <RouteWithLayout
        isRestricted
        component={Sales}
        exact
        layout={MainLayout}
        path='/orders'
      />
    </Switch>
  );
};

export default Routes;
