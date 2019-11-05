import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import validate from 'validate.js';
//import { useSnackbar } from 'notistack';

import { Container, Divider, Grid, TextField, Button } from '@material-ui/core';
import { ClientsContext } from '../../Clients';

import FormDialogButton from '../../../../tools/FormDialog';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
}));

const schema = {
  name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32,
    },
  },
  rfc: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32,
    },
  },
  city: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32,
    },
  },
  address: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 100,
    },
  },
  zipcode: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32,
    },
  },
  colony: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32,
    },
  },
  phone: {
    presence: { allowEmpty: true },
    length: {
      maximum: 200,
    },
  },
};

const ClientForm = props => {
  const { open, client, isEditable, onClose, className, ...rest } = props;
  const classes = useStyles();

  console.log(client);

  const context = useContext(ClientsContext);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      name: client && isEditable ? client.name : '',
      rfc: client && isEditable ? client.rfc : '',
      city: client && isEditable ? client.city : '',
      address: client && isEditable ? client.address : '',
      zipcode: client && isEditable ? client.zipcode : '',
      colony: client && isEditable ? client.colony : '',
      phone: client && isEditable ? client.phone : '',
    },
    touched: {},
    errors: {},
  });

  // console.log(context.userId);

  // console.log(context.user);
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

  const hasError = field => (formState.errors[field] ? true : false);

  const handleClose = () => {
    setFormState(formState => ({
      ...formState,
      values: {},
    }));

    onClose();
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (isEditable) {
      context.editClient(formState.values);
    } else {
      context.addClient(formState.values);
    }

    handleClose();
  };
  const Form = (
    <Container component='main' maxWidth='xs'>
      <form
        {...rest}
        className={clsx(classes.root, className)}
        autoComplete='off'
        noValidate
        onSubmit={handleSubmit}>
        <Divider />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              error={hasError('name')}
              fullWidth
              helperText={hasError('name') ? formState.errors.name[0] : null}
              label='Name'
              margin='dense'
              name='name'
              type='text'
              onChange={handleChange}
              value={formState.values.name || ''}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={hasError('rfc')}
              fullWidth
              helperText={hasError('rfc') ? formState.errors.rfc[0] : null}
              label='Rfc'
              margin='dense'
              name='rfc'
              type='text'
              onChange={handleChange}
              value={formState.values.rfc || ''}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={hasError('city')}
              fullWidth
              helperText={hasError('city') ? formState.errors.city[0] : null}
              label='city'
              margin='dense'
              name='city'
              type='text'
              onChange={handleChange}
              value={formState.values.city || ''}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={hasError('address')}
              fullWidth
              helperText={
                hasError('address') ? formState.errors.address[0] : null
              }
              label='Address'
              margin='dense'
              name='address'
              type='text'
              onChange={handleChange}
              value={formState.values.address || ''}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={hasError('zipcode')}
              fullWidth
              helperText={
                hasError('zipcode') ? formState.errors.zipcode[0] : null
              }
              label='Zipcode'
              margin='dense'
              name='zipcode'
              type='text'
              onChange={handleChange}
              value={formState.values.zipcode || ''}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={hasError('colony')}
              fullWidth
              helperText={
                hasError('colony') ? formState.errors.colony[0] : null
              }
              label='Colony'
              margin='dense'
              name='colony'
              onChange={handleChange}
              type='text'
              value={formState.values.colony || ''}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={hasError('phone')}
              fullWidth
              helperText={hasError('phone') ? formState.errors.phone[0] : null}
              label='Phone'
              margin='dense'
              name='phone'
              type='text'
              onChange={handleChange}
              value={formState.values.phone || ''}
              variant='outlined'
            />
          </Grid>
        </Grid>
        <Divider />
      </form>
    </Container>
  );

  const SubmitButton = (
    <Button
      disabled={!formState.isValid}
      //fullWidth
      variant='contained'
      type='submit'
      onClick={handleSubmit}
      color='secondary'>
      {isEditable ? 'Save Changes' : 'Add client'}
    </Button>
  );

  return (
    <FormDialogButton
      title='client'
      component={Form}
      submitButton={SubmitButton}
      open={open}
      onClose={handleClose}
    />
  );
};

ClientForm.propTypes = {
  className: PropTypes.string,
};

export default ClientForm;
