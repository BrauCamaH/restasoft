import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

//import ProductsFormDialog from '../ProductFormDialog';

import SearchInput from '../../../../tools/SearchBar';

import { Button } from '@material-ui/core';

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
  const { className, ...rest } = props;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSearchChange = event => {};

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button color='primary' variant='contained' onClick={handleOpen}>
          Add Sale
        </Button>
        {/* <ProductsFormDialog open={open} onClose={handleClose} /> */}
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder='Search product'
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

SalesToolbar.propTypes = {
  className: PropTypes.string,
};

export default SalesToolbar;
