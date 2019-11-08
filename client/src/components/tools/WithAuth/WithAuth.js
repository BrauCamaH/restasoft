import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../../../context/user-context';

import axios from 'axios';
const WithAuth = props => {
  const { ComponentToProtect, layout: Layout, matchProps } = props;
  const context = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/auth/checkToken')
      .then(res => {
        if (res.status === 200) {
          setLoading(false);
          //console.log(res.data.user.userId);
          context.setUserId(res.data.user.userId);
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        setRedirect(true);
      });
  }, []);

  return (
    <React.Fragment>
      {redirect ? (
        <Redirect to='/sign-in' />
      ) : loading ? (
        <div></div>
      ) : (
        <Layout>
          <ComponentToProtect {...matchProps} />
        </Layout>
      )}
    </React.Fragment>
  );
};

export default WithAuth;
