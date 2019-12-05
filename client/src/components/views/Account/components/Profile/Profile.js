import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import validate from 'validate.js';
import UserContext from '../../../../../context/user-context';

import axios from 'axios';
import { useSnackbar } from 'notistack';

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  FormControl,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
}));

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32,
    },
  },
  lastName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32,
    },
  },
  username: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32,
      minimum: 4,
    },
  },
};

const AccountDetails = props => {
  const { className, ...rest } = props;
  const context = useContext(UserContext);
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const firstName = context.user.name.split(' ')[0];
  const lastName = context.user.name.split(' ')[1];
  const username = context.user.username;

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      firstName: firstName,
      lastName: lastName,
      username: username,
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
    const name = `${formState.values.firstName} ${formState.values.lastName}`;
    const username = formState.values.username;
    axios
      .put(`/api/users/profile/${context.user.id}`, {
        name: name,
        username: username,
      })
      .then(res => {
        enqueueSnackbar('User Profile Updated', {
          variant: 'success',
        });
        setTimeout(closeSnackbar, 2000);
        context.setUser(res.data.user);
      })
      .catch(err => {
        enqueueSnackbar('Error', {
          variant: 'error',
        });
        setTimeout(closeSnackbar, 2000);
      });
  };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <FormControl autoComplete='off'>
        <CardHeader subheader='The profile can be edited' title='Profile' />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                error={hasError('firstName')}
                fullWidth
                helperText={
                  hasError('firstName') ? formState.errors.firstName[0] : null
                }
                label='First name'
                margin='dense'
                name='firstName'
                onChange={handleChange}
                required
                value={formState.values.firstName}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={hasError('lastName')}
                fullWidth
                helperText={
                  hasError('lastName') ? formState.errors.lastName[0] : null
                }
                label='Last name'
                margin='dense'
                name='lastName'
                onChange={handleChange}
                required
                value={formState.values.lastName || ''}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={hasError('username')}
                fullWidth
                helperText={
                  hasError('username') ? formState.errors.username[0] : null
                }
                label='Username'
                margin='dense'
                name='username'
                onChange={handleChange}
                required
                value={formState.values.username || ''}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                label='Type'
                margin='dense'
                value={context.user.type}
                disabled={true}
                variant='outlined'
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            disabled={!formState.isValid}
            color='primary'
            variant='contained'
            type='submit'
            onClick={handleSubmit}>
            Save details
          </Button>
        </CardActions>
      </FormControl>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
};

export default AccountDetails;
