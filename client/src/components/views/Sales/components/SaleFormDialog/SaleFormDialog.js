import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import validate from 'validate.js';

import {
  Container,
  Divider,
  Grid,
  Button,
  Typography,
} from '@material-ui/core';

import Select from 'react-select';

import FormDialog from '../../../../tools/FormDialog';

import { SalesContext } from '../../Sales';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
  content: {
    marginBottom: theme.spacing(20),
  },
}));

const schema = {
  client: {
    presence: { allowEmpty: false },
  },
  table: {
    presence: { allowEmpty: false },
  },
};
const SaleFormDialog = props => {
  const { open, sale, isEditable, onClose, className, ...rest } = props;
  const classes = useStyles();
  const context = useContext(SalesContext);

  const table = sale ? { value: sale.table.id, label: sale.table.code } : null;
  const client = sale
    ? {
        value: sale.client.id,
        label: `${sale.client.name}/${sale.client.city}`,
      }
    : null;

  const [formState, setFormState] = useState({
    isValid: false,
    values: { table: table, client: client },
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

  const handleClient = selectedOption => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        client: selectedOption,
      },
      touched: {
        ...formState.touched,
        client: true,
      },
    }));
  };

  const handleTable = selectedOption => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        table: selectedOption,
      },
      touched: {
        ...formState.touched,
        table: true,
      },
    }));
  };

  const handleClose = () => {
    if (!isEditable) {
      setFormState(formState => ({
        ...formState,
        values: {},
      }));
    }
    onClose();
  };

  const handleSubmit = event => {
    event.preventDefault();
    const id = isEditable ? sale.id : 0;
    const values = {
      id: id,
      client: formState.values.client.value,
      table: formState.values.table.value,
    };

    if (isEditable) {
      context.editSale(values);
    } else {
      context.addSale(values);
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
        onSubmit={handleSubmit}></form>
      <Divider />
      <Grid container spacing={3} className={classes.content}>
        <Grid item xs={12}>
          <Typography variant='h4'>Select a Client</Typography>
        </Grid>
        <Grid item xs={12}>
          <Select
            required
            className='basic-single'
            value={formState.values.client}
            onChange={handleClient}
            options={
              context.clients
                ? context.clients.map(client => ({
                    value: client.id,
                    label: `${client.name}/${client.city}`,
                  }))
                : []
            }></Select>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h4'>Select a Table</Typography>
        </Grid>
        <Grid item xs={12}>
          <Select
            required
            className='basic-single'
            value={formState.values.table}
            onChange={handleTable}
            options={
              context.tables
                ? context.tables.map(table => ({
                    value: table.id,
                    label: table.code,
                  }))
                : []
            }></Select>
        </Grid>
      </Grid>
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
      {isEditable ? 'Save Changes' : 'Add Sale'}
    </Button>
  );

  return (
    <div>
      <FormDialog
        title='Sale'
        component={Form}
        submitButton={SubmitButton}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};

export default SaleFormDialog;
