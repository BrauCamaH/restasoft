import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { CustomMaterialTable } from './../../../../tools';
import { Card, TextField, Select, MenuItem } from '@material-ui/core';

import { useSnackbar } from 'notistack';
import { AlertDialog } from '../../../../tools';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const UsersTable = props => {
  const { editUser, deleteUser, className, users, ...rest } = props;
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [openAlert, setOpenAlert] = useState(false);

  const [currentUserId, setCurrentUserId] = useState(0);

  const [columns] = useState([
    {
      title: 'Name',
      field: 'name',
      editComponent: props => (
        <TextField
          type='text'
          variant='outlined'
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      ),
    },
    {
      title: 'Username',
      field: 'username',

      editComponent: props => (
        <TextField
          variant='outlined'
          type='text'
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      ),
    },
    {
      title: 'Type',
      field: 'type',

      editComponent: props => (
        <Select
          type='text'
          variant='outlined'
          value={props.value}
          onChange={e => props.onChange(e.target.value)}>
          <MenuItem value={'Administrator'}>Administrator</MenuItem>
          <MenuItem value={'Waiter'}>Waiter</MenuItem>
        </Select>
      ),
    },
  ]);
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CustomMaterialTable
        title=''
        columns={columns}
        data={users}
        options={{ search: false }}
        actions={[
          {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: (event, rowData) => {
              setCurrentUserId(rowData.id);
              setOpenAlert(true);
            },
          },
        ]}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              if (newData.username.length < 4) {
                enqueueSnackbar('Please fill all the fields correctly', {
                  variant: 'error',
                });
                setTimeout(closeSnackbar, 2000);
                reject();
              } else {
                editUser(newData);
                resolve();
              }
            }),
        }}
      />
      <AlertDialog
        open={openAlert}
        title='Are you sure?'
        contentText={'The action will delete the current user'}
        onClose={() => {
          setOpenAlert(false);
        }}
        onAgree={() => {
          deleteUser(currentUserId);
        }}
      />
    </Card>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array,
};

export default UsersTable;
