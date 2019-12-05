import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import CategoryFormDialog from '../CategoryForm';
import { CategoriesContext } from '../../Categories';

import { SearchBar as SearchInput, RoleManager } from '../../../../tools';

import { Button } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

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

const ProductsToolbar = props => {
  const { loading, className, ...rest } = props;
  const [open, setOpen] = useState(false);

  const context = useContext(CategoriesContext);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSearchChange = value => {
    axios
      .get(`/api/categories/search?value=${value}`)
      .then(res => {
        context.setCategories(res.data);
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
        <RoleManager>
          {loading ? (
            <Skeleton width={100} height={40} />
          ) : (
            <Button color='primary' variant='contained' onClick={handleOpen}>
              Add Category
            </Button>
          )}
        </RoleManager>
        <CategoryFormDialog open={open} onClose={handleClose} />
      </div>
      <div className={classes.row}>
        {loading ? (
          <Skeleton className={classes.searchInput} width={450} height={50} />
        ) : (
          <SearchInput
            className={classes.searchInput}
            placeholder='Search Categories'
            onChange={handleSearchChange}
          />
        )}
      </div>
    </div>
  );
};

ProductsToolbar.propTypes = {
  className: PropTypes.string,
};

export default ProductsToolbar;
