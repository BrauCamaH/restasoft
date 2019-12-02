import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import { useSnackbar } from 'notistack';
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

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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

  const deleteUser = id => {
    const updatedUsers = [...users];
    const updatedItemIndex = updatedUsers.findIndex(item => item.id === id);

    updatedUsers.splice(updatedItemIndex, 1);

    setUsers(updatedUsers);
    axios
      .delete(`api/users/${id}`)
      .then(res => {
        enqueueSnackbar('User Deleted', {
          variant: 'success',
        });
        setTimeout(closeSnackbar, 2000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className={classes.root}>
      <UsersToolbar />
      {!loading ? (
        <div className={classes.content}>
          <UsersTable users={users} deleteUser={deleteUser} />
        </div>
      ) : null}
    </div>
  );
};

export default UserList;
