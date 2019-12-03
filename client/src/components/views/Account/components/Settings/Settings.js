import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField,
} from '@material-ui/core';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import UserContext from '../../../../../context/user-context';

const schema = {
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32,
      minimum: 6,
    },
  },
  confirm: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32,
    },
  },
};

const useStyles = makeStyles(() => ({
  root: {},
}));

const Password = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const context = useContext(UserContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phone: '',
    },
    touched: {},
    errors: {},
  });
  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const handleSubmit = event => {
    event.preventDefault();

    if (formState.values.password !== formState.values.confirm) {
      enqueueSnackbar('Passwords must match', {
        variant: 'error',
      });
      setTimeout(closeSnackbar, 2000);
    } else {
      event.preventDefault();
      axios
        .put(`/api/users/profile/${context.user.id}`, {
          password: formState.values.password,
        })
        .then(res => {
          enqueueSnackbar('Password has been changed', {
            variant: 'success',
          });
          setTimeout(closeSnackbar, 2000);
          setFormState(formState => ({
            ...formState,
            values: {},
          }));
        })
        .catch(err => {
          enqueueSnackbar(err.response.data.message, {
            variant: 'error',
          });
          setTimeout(closeSnackbar, 2000);
        });
    }
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form onSubmit={handleSubmit}>
        <CardHeader subheader='Update password' title='Password' />
        <Divider />
        <CardContent>
          <TextField
            error={hasError('password')}
            fullWidth
            helperText={
              hasError('password') ? formState.errors.password[0] : null
            }
            label='Password'
            name='password'
            onChange={handleChange}
            type='password'
            value={formState.values.password || ''}
            variant='outlined'
          />
          <TextField
            error={hasError('confirm')}
            fullWidth
            helperText={
              hasError('confirm') ? formState.errors.confirm[0] : null
            }
            label='Confirm password'
            name='confirm'
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type='password'
            value={formState.values.confirm || ''}
            variant='outlined'
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            type='submit'
            color='primary'
            variant='outlined'
            disabled={!formState.isValid}>
            Update
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string,
};

export default Password;
