import React, { useState, useEffect, forwardRef } from 'react';

import { Link as RouterLink, withRouter } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';
import validate from 'validate.js';

import {
  TextField,
  CssBaseline,
  Avatar,
  Button,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  Container,
  Link,
} from '@material-ui/core';

const schema = {
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
};

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    background: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles();

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
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const handleSubmit = () => {
    //create user
    const { username, password } = formState.values;
    axios
      .post(`api/users/sign-in`, {
        username: username,
        password: password,
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form}>
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
              value={formState.values.username || ''}
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
              value={formState.values.password || ''}
              variant='outlined'
              margin='normal'
            />
          </Grid>
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            //type='submit'
            fullWidth
            variant='contained'
            className={classes.submit}
            disabled={!formState.isValid}
            onClick = {handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/sign-up' component={RouterLink} variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default withRouter(SignIn);
