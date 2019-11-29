import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Drawer } from '@material-ui/core';

import { SearchBar } from '../../../../tools';
import { SingUp } from '../../../../views';

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
  const { className, ...rest } = props;

  const classes = useStyles();
  const [open, setOpen] = useState();

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
        <SearchBar className={classes.searchInput} placeholder='Search user' />
      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string,
};

export default UsersToolbar;
