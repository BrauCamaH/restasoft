import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import validate from 'validate.js';
import { DropzoneArea } from 'material-ui-dropzone';

import { Container, Divider, Grid, TextField, Button } from '@material-ui/core';
import { ProductsContext } from '../../Products';

import FormDialog from '../../../../tools/FormDialog';

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
      maximum: 200,
    },
  },
  price: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 6,
    },
  },
  description: {
    presence: { allowEmpty: true },
    length: {
      maximum: 200,
    },
  },
};

const ProductFormDialog = props => {
  const { open, product, isEditable, onClose, className, ...rest } = props;
  const classes = useStyles();

  const context = useContext(ProductsContext);

  const id = product ? product.id : 0;

  const name = product ? product.name : '';
  const price = product ? product.price : 0;
  const description = product ? product.description : '';
  const image = product ? product.image : '';

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      id: id,
      name: name,
      price: price,
      description: description,
      image: image,
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

  const handleImages = files => {
    //setImages(files);
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        image: files[0],
      },
    }));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const handleClose = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        name: name,
        price: price,
        description: description,
        image: image,
      },
    }));

    onClose();
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (isEditable) {
      context.editProduct(formState.values);
    } else {
      context.addProduct(formState.values);
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
              onChange={handleChange}
              required
              value={formState.values.name}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={hasError('price')}
              fullWidth
              helperText={hasError('price') ? formState.errors.price[0] : null}
              label='Price'
              margin='dense'
              name='price'
              type='number'
              onFocus={e => e.target.select()}
              value={formState.values.price}
              onChange={handleChange}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              error={hasError('description')}
              fullWidth
              helperText={
                hasError('description') ? formState.errors.description[0] : null
              }
              label='Description'
              margin='dense'
              name='description'
              onChange={handleChange}
              value={formState.values.description}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12}>
            <DropzoneArea
              required
              filesLimit={1}
              name='image'
              onChange={handleImages}
              acceptedfiles={['image/']}
              showFileNamesInPreview={true}
              showAlerts={false}
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
      {isEditable ? 'Save Changes' : 'Add Product'}
    </Button>
  );

  return (
    <FormDialog
      title='Product'
      component={Form}
      submitButton={SubmitButton}
      open={open}
      onClose={handleClose}
    />
  );
};

ProductFormDialog.propTypes = {
  className: PropTypes.string,
};

export default ProductFormDialog;
