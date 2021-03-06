import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ProductsFormDialog from '../ProductFormDialog';
import { SearchBar as SearchInput, RoleManager } from '../../../../tools';
import { Button } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { ProductsContext } from '../../Products';
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
  const {
    loading,
    category,
    className,
    staticContext,
    history,
    ...rest
  } = props;
  const [open, setOpen] = useState(false);

  const context = useContext(ProductsContext);

  const handleBack = () => {
    history.goBack();
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleSearchChange = value => {
    axios
      .get(`/api/products/${category}`)
      .then(res => {
        context.setProducts(
          res.data.filter(
            item =>
              item.name.toLowerCase().includes(value.toLowerCase()) ||
              item.description.toLowerCase().includes(value.toLowerCase())
          )
        );
      })
      .catch(err => {
        console.error(err);
      });
  };

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <span className={classes.spacer} />
        <RoleManager>
          {loading ? (
            <Skeleton width={100} height={40} />
          ) : (
            <Button color='primary' variant='contained' onClick={handleOpen}>
              Add Product
            </Button>
          )}
        </RoleManager>
        <ProductsFormDialog open={open} onClose={handleClose} />
      </div>
      <div className={classes.row}>
        {loading ? (
          <Skeleton className={classes.searchInput} width={450} height={50} />
        ) : (
          <SearchInput
            className={classes.searchInput}
            placeholder='Search product'
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

export default withRouter(ProductsToolbar);
