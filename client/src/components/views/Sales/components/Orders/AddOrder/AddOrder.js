import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import validate from 'validate.js';

import { TextField, Button, Grid } from '@material-ui/core';
import Select from 'react-select';
import { OrdersContext } from '../../../Sales';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  marginTop: {
    marginTop: theme.spacing(1),
  },
}));

const schema = {
  product: {
    presence: { allowEmpty: false },
  },
  quantity: {
    presence: { allowEmpty: false },
  },
};

const AddOrder = props => {
  const { sale, products, className, ...rest } = props;
  const classes = useStyles();
  const context = useContext(OrdersContext);

  const [formState, setFormState] = useState({
    isValid: false,
    values: { quantity: 1 },
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

  const handleSubmit = event => {
    event.preventDefault();

    context.addOrder(sale, formState.values);

    console.log(formState.values);
    setFormState(formState => ({
      ...formState,
      values: {
        product: '',
        quantity: 1,
      },
    }));
  };

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

  const handleProduct = event => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        product: event.value,
      },
      touched: {
        ...formState.touched,
        product: true,
      },
    }));
  };

  const hasError = field => (formState.errors[field] ? true : false);

  return (
    <form
      {...rest}
      className={clsx(classes.root, className)}
      autoComplete='off'
      noValidate
      onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            error={hasError('quantity')}
            fullWidth
            helperText={
              hasError('quantity') ? formState.errors.quantity[0] : null
            }
            label='Quantity'
            margin='dense'
            name='quantity'
            type='number'
            onFocus={event => event.target.select()}
            onChange={handleChange}
            value={formState.values.quantity}
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.marginTop}>
          <Select
            required
            className='basic-single'
            label={formState.values.product}
            onChange={handleProduct}
            options={products.map(product => ({
              value: product.id,
              label: `${product.name}  $${product.price}`,
            }))}></Select>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.marginTop}>
        <Button
          disabled={!formState.isValid}
          fullWidth
          variant='contained'
          type='submit'
          color='secondary'>
          {'Add Order'}
        </Button>
      </Grid>
    </form>
  );
};

export default AddOrder;
