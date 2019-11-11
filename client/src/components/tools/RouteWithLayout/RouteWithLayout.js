import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { WithAuth } from '../index';
const RouteWithLayout = props => {
  const { isRestricted, layout: Layout, component: Component, ...rest } = props;

  return (
    <div>
      {isRestricted ? (
        <Route
          {...rest}
          render={matchProps => (
            <WithAuth
              layout={Layout}
              ComponentToProtect={Component}
              matchProps={matchProps}></WithAuth>
          )}
        />
      ) : (
        <Route
          {...rest}
          render={matchProps => (
            <Layout>
              <Component {...matchProps} />
            </Layout>
          )}
        />
      )}
    </div>
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default RouteWithLayout;
