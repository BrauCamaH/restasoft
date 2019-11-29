import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { CustomMaterialTable } from './../../../../tools';
import { Card } from '@material-ui/core';

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
  const { className, users, ...rest } = props;

  const classes = useStyles();

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
      />
    </Card>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array,
};

export default UsersTable;
