import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import SaleFormDialog from '../SaleFormDialog';

import SearchInput from '../../../../tools/SearchBar';

import { Button } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import UserContext from '../../../../../context/user-context';
import { SalesContext } from '../../Sales';
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
    flexGrow: 10,
  },
  addButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
}));

const SalesToolbar = props => {
  const { loading, className, ...rest } = props;
  const context = useContext(SalesContext);
  const userContext = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSearchChange = value => {
    axios
      .get(`/api/sales/search/${userContext.user.id}?value=${value}`)
      .then(res => {
        context.setSales(res.data.rows);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        {loading ? (
          <Skeleton width={100} height={40} />
        ) : (
          <Button color='primary' variant='contained' onClick={handleOpen}>
            Add Sale
          </Button>
        )}
        <SaleFormDialog open={open} onClose={handleClose} />
      </div>
      <div className={classes.row}>
        {loading ? (
          <Skeleton className={classes.searchInput} width={450} height={50} />
        ) : (
          <SearchInput
            className={classes.searchInput}
            placeholder='Search Sale'
            onChange={handleSearchChange}
          />
        )}
      </div>
    </div>
  );
};

SalesToolbar.propTypes = {
  className: PropTypes.string,
};

export default SalesToolbar;
