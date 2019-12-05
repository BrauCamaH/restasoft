import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useDebounce } from 'use-debounce';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
  },
}));

const SearchInput = props => {
  const { className, onChange, style, ...rest } = props;

  const classes = useStyles();

  const [text, setText] = useState('');
  const [debouncedText] = useDebounce(text, 500);

  const handleDebouncedText = event => {
    setText(event.target.value);
  };

  useEffect(() => {
    onChange(text);
  }, [debouncedText]);

  return (
    <Paper {...rest} className={clsx(classes.root, className)} style={style}>
      <SearchIcon className={classes.icon} />
      <Input
        {...rest}
        type='search'
        className={classes.input}
        disableUnderline
        onChange={e => {
          handleDebouncedText(e);
        }}
      />
    </Paper>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default SearchInput;
