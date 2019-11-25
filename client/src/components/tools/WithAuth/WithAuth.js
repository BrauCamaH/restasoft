import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../../../context/user-context';

import useAxios from 'axios-hooks';
import axios from 'axios';
const WithAuth = props => {
  const { ComponentToProtect, layout: Layout, matchProps } = props;
  const context = useContext(UserContext);

  const [{ error, loading }] = useAxios(`/api/auth/checkToken`);

  useEffect(() => {
    axios
      .get(`/api/auth/checkToken`)
      .then(res => {
        context.setUser(res.data.user);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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
