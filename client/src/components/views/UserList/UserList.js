import React, { useState, useEffect, useContext, createContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { RoleManager } from '../../tools';
import { Redirect } from 'react-router-dom';

import UserContext from '../../../context/user-context';

const UserListContext = createContext({
  users: [],
  addUser: user => {},
  deleteUser: id => {},
  editUser: user => {},
  setUsers: user => {},
});

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
  const context = useContext(UserContext);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/users`)
      .then(res => {
        setUsers(res.data.filter(user => user.id !== context.user.id));
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.error(err);
      });
  }, []);

  const addUser = user => {
    axios
      .post(`api/users/sign-up`, {
        name: user.name,
        username: user.username,
        password: user.password,
        type: user.type,
      })
      .then(res => {
        const updatedUsers = [...users];
        updatedUsers.push(res.data.user);

        setUsers(updatedUsers);

        enqueueSnackbar(res.data.message, {
          variant: 'success',
        });
        setTimeout(closeSnackbar, 2000);
      })
      .catch(err => {
        enqueueSnackbar(err.response.data.message, {
          variant: 'error',
        });
        setTimeout(closeSnackbar, 2000);
      });
  };

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
      <UserListContext.Provider
        value={{
          users: users,
          addUser: addUser,
          deleteUser: deleteUser,
          editUser: editUser,
        }}>
        <div className={classes.root}>
          <UsersToolbar setUsers={setUsers} />
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
      </UserListContext.Provider>
    </RoleManager>
  );
};

export { UserListContext };
export default UserList;
