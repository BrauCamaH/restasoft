import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import { SearchBar } from '../../../../tools';

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

const CategoriesToolbar = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button color='primary' variant='contained'>
          Add category
        </Button>
      </div>
      <div className={classes.row}>
        <SearchBar
          className={classes.searchInput}
          placeholder='Search category'
        />
      </div>
    </div>
  );
};

CategoriesToolbar.propTypes = {
  className: PropTypes.string,
};

export default CategoriesToolbar;
