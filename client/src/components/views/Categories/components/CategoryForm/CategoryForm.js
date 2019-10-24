import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import validate from 'validate.js';
import { DropzoneArea } from 'material-ui-dropzone';
//import { useSnackbar } from 'notistack';

import { Container, Divider, Grid, TextField, Button } from '@material-ui/core';
import {CategoriesContext} from '../../Categories';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom : theme.spacing(4)
  },
}));

const schema = {
  name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32,
    },
  },
  description: {
    presence: { allowEmpty: true },
    length: {
      maximum: 200,
    },
  },
};

const CategoryForm = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const context = useContext(CategoriesContext);


  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      name: '',
      description: '',
      image: '',
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

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  return (
    <Container component='main' maxWidth='xs'>
      <form
        {...rest}
        className={clsx(classes.root, className)}
        autoComplete='off'
        noValidate
      >
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
              filesLimit={1}
              acceptedfiles={['image/']}
              showFileNamesInPreview={true}
              showAlerts={false}
            />
          </Grid>
          <Grid item xs={12}>
            <Button disabled={!formState.isValid} 
                    fullWidth variant='contained' 
                    color='secondary' 
                    onClick= {context.addCategory}>
              Agregar
            </Button>
          </Grid>
        </Grid>
        <Divider />
      </form>
    </Container>
  );
};





CategoryForm.propTypes = {
  className: PropTypes.string,
};

export default CategoryForm;
