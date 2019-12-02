import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { CustomMaterialTable } from './../../../../tools';
import { Card } from '@material-ui/core';

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
  const { deleteUser, className, users, ...rest } = props;
  const classes = useStyles();
  const [openAlert, setOpenAlert] = useState(false);

  const [currentUserId, setCurrentUserId] = useState(0);

  const [columns] = useState([
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Username',
      field: 'username',
    },
    {
      title: 'Type',
      field: 'type',
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
            icon: 'edit',
            tooltip: 'Edit User',
            onClick: () => {},
          },
          {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: (event, rowData) => {
              setCurrentUserId(rowData.id);
              setOpenAlert(true);
            },
          },
        ]}
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
