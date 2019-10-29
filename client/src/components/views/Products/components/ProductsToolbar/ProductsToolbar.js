import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import ProductsFormDialog from '../ProductFormDialog';
import { ProductsContext } from '../../Products';

import SearchInput from '../../../../tools/SearchBar';

import { Button } from '@material-ui/core';

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
  const { className, ...rest } = props;
  const [open, setOpen] = useState(false);

  const context = useContext(ProductsContext);

  const [currentList, setCurrentList] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSearchChange = event => {
    let newList = [];

    axios
      .get(`api/categories`)
      .then(res => {
        setCurrentList(res.data);
      })
      .catch(err => {
        console.error(err);
      });

    if (event.target.value === '') {
      newList = [...currentList];
    } else {
      newList = currentList.filter(item =>
        item.name.toLowerCase().includes(event.target.value.toLowerCase()),
      );
    }
    //console.log(updatedCategories);
    context.setCategories(newList);
  };

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button color='primary' variant='contained' onClick={handleOpen}>
          Add Product
        </Button>
        <ProductsFormDialog open={open} onClose={handleClose} />
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

ProductsToolbar.propTypes = {
  className: PropTypes.string,
};

export default ProductsToolbar;
