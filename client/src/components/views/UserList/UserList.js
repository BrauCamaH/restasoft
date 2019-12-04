import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { RoleManager } from '../../tools';
import { Redirect } from 'react-router-dom';
import UserContext from '../../../context/user-context';

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

  const editUser = user => {
    const { id, name, username, type } = user;
    const updatedUsers = [...users];
    const updatedItemIndex = updatedUsers.findIndex(item => item.id === id);

    updatedUsers[updatedItemIndex] = user;
    setUsers(updatedUsers);
    axios
      .put(`/api/users/${id}`, {
        name: name,
        username: username,
        type: type,
      })
      .then(res => {
        enqueueSnackbar('User Profile Updated', {
          variant: 'success',
        });
        setTimeout(closeSnackbar, 2000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <RoleManager customReturn={<Redirect to='/orders' />}>
      <div className={classes.root}>
        <UsersToolbar />
        {!loading ? (
          <div className={classes.content}>
            <UsersTable
              users={users}
              deleteUser={deleteUser}
              editUser={editUser}
            />
          </div>
        ) : null}
      </div>
    </RoleManager>
  );
};

export default UserList;
