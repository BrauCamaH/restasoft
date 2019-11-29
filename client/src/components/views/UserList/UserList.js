import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const UserList = () => {
  const classes = useStyles();
  const [users, setUsers] = useState(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/users`)
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.error(err);
      });
  }, []);

  return (
    <div className={classes.root}>
      <UsersToolbar />
      {!loading ? (
        <div className={classes.content}>
          <UsersTable users={users} />
        </div>
      ) : null}
    </div>
  );
};

export default UserList;
