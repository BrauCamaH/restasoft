import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import CategoryForm  from '../CategoryForm';
import FormDialogButton  from '../../../../tools/FormDialog';

import SearchInput from '../../../../tools/SearchBar';

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


  const classes = useStyles();
  const Form=<CategoryForm></CategoryForm>
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <FormDialogButton title='Category'
                  component={Form}
                  action= 'Add Category'
        />
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder='Search product'
        />
      </div>
    </div>
  );
};

ProductsToolbar.propTypes = {
  className: PropTypes.string,
};

export default ProductsToolbar;
