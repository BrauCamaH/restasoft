import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import validate from 'validate.js';
import UserContext from '../../../../../context/user-context';

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
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
  email: {
    presence: { message: 'is required' },
    length: {
      maximum: 30,
    },
  },
  phone: {
    presence: { message: 'is required' },
    length: {
      maximum: 13,
    },
  },
};

const AccountDetails = props => {
  const { className, ...rest } = props;
  const context = useContext(UserContext);
  const classes = useStyles();

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

  const [values, setValues] = React.useState({
    type: context.user.type,
  });
  const handleSelect = event => {
    setValues(oldValues => ({
      ...oldValues,
      type: event.target.value,
    }));
  };
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <FormControl autoComplete='off' noValidate>
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
                value={formState.values.lastName}
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
                value={formState.values.username}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Select
                fullWidth
                value={values.type}
                name={formState.values.type}
                onChange={handleSelect}
                type='text'>
                <MenuItem value={'Administrator'}>Administrator</MenuItem>
                <MenuItem value={'Waiter'}>Waiter</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color='primary' variant='contained' type='submit'>
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
