import React, { useState, useEffect, useContext } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSnackbar } from 'notistack';

import { UserListContext } from '../UserList/UserList';
import axios from 'axios';
import validate from 'validate.js';

import {
  TextField,
  CssBaseline,
  Avatar,
  Button,
  Typography,
  Grid,
  MenuItem,
  Select,
  FormControl,
  IconButton,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
      maximum: 20,
    },
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 30,
    },
  },
  rewrite: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128,
    },
  },
};

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    background: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    width: '100%',
  },
}));

const SignUp = props => {
  const classes = useStyles();
  const { onClose } = props;
  const context = useContext(UserListContext);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
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
    type: 'Waiter',
  });

  const handleSelect = event => {
    setValues(oldValues => ({
      ...oldValues,
      type: event.target.value,
    }));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleSubmit = event => {
    //create user
    event.preventDefault();
    const {
      firstName,
      lastName,
      username,
      password,
      rewrite,
    } = formState.values;
    const { type } = values;
    const user = {
      name: `${firstName} ${lastName}`,
      username: username,
      password: password,
      type: type,
    };
    if (password === rewrite) {
      context.addUser(user);
    } else {
      enqueueSnackbar('passwords do not match', {
        variant: 'error',
      });
      setTimeout(closeSnackbar, 2000);
    }
  };
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <IconButton onClick={onClose}>
        <ArrowBackIcon />
      </IconButton>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={hasError('firstName')}
                fullWidth
                helperText={
                  hasError('firstName') ? formState.errors.firstName[0] : null
                }
                label='First name'
                name='firstName'
                onChange={handleChange}
                type='text'
                //value={formState.values.firstName || ''}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={hasError('lastName')}
                fullWidth
                helperText={
                  hasError('lastName') ? formState.errors.lastName[0] : null
                }
                label='Last name'
                name='lastName'
                onChange={handleChange}
                type='text'
                //value={formState.values.lastName || ''}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={hasError('username')}
                fullWidth
                helperText={
                  hasError('username') ? formState.errors.username[0] : null
                }
                label='Username'
                name='username'
                onChange={handleChange}
                type='text'
                //value={formState.values.username || ''}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
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
                //value={formState.values.password || ''}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={hasError('rewrite')}
                fullWidth
                helperText={
                  hasError('rewrite') ? formState.errors.rewrite[0] : null
                }
                label='Rewrite Password'
                name='rewrite'
                onChange={handleChange}
                type='password'
                //value={formState.values.rewrite || ''}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant='outlined' className={classes.formControl}>
                <Select
                  fullWidth
                  value={values.type}
                  name={formState.values.type}
                  onChange={handleSelect}
                  type='text'>
                  <MenuItem value={'Administrator'}>Administrator</MenuItem>
                  <MenuItem value={'Waiter'}>Waiter</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            className={classes.submit}
            color='primary'
            disabled={!formState.isValid}
            fullWidth
            size='large'
            type='submit'
            variant='contained'>
            Create Account
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
