import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../../../context/user-context';

import useAxios from 'axios-hooks';

const WithAuth = props => {
  const { ComponentToProtect, layout: Layout, matchProps } = props;
  const context = useContext(UserContext);

  const [{ data, error, loading }] = useAxios(`/api/auth/checkToken`);

  const userId = data !== undefined ? data.user.userId : 1;
  context.setUserId(userId);

  return (
    <React.Fragment>
      {error ? (
        <Redirect to='/sign-in' />
      ) : loading ? null : (
        <Layout>
          <ComponentToProtect {...matchProps} />
        </Layout>
      )}
    </React.Fragment>
  );
};

export default WithAuth;
