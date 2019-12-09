import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Drawer } from '@material-ui/core';

import { SearchBar } from '../../../../tools';
import { SingUp } from '../../../../views';

import UserContext from '../../../../../context/user-context';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
}));

const UsersToolbar = props => {
  const { setUsers, className, ...rest } = props;
  const context = useContext(UserContext);
  const classes = useStyles();
  const [open, setOpen] = useState();

  const handleSearchChange = value => {
    axios
      .get(`/api/users/search?value=${value}`)
      .then(res => {
        setUsers(res.data.filter(user => user.id !== context.user.id));
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          onClick={() => {
            setOpen(true);
          }}
          color='primary'
          variant='contained'>
          Add user
        </Button>
        <Drawer
          anchor='right'
          open={open}
          onClose={() => {
            setOpen(false);
          }}>
          <SingUp
            onClose={() => {
              setOpen(false);
            }}></SingUp>
        </Drawer>
      </div>
      <div className={classes.row}>
        <SearchBar
          className={classes.searchInput}
          placeholder='Search user'
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string,
};

export default UsersToolbar;
