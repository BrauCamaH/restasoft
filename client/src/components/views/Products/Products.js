import React from 'react';
import { ProductCard, ProductsToolbar } from './components';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

const products = [
  {
    id: 1,
    image: 'http://lorempixel.com/500/500/food',
    price: 89,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, mollitia qui! Nisi fugit consectetur sint illum reiciendis et error nihil quia, facilis sit excepturi. Odit officiis magnam nam vel perferendis.',
    name: 'Product Name',
  },
  {
    id: 2,
    image: 'http://lorempixel.com/500/500/food',
    price: 89,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, mollitia qui! Nisi fugit consectetur sint illum reiciendis et error nihil quia, facilis sit excepturi. Odit officiis magnam nam vel perferendis.',
    name: 'Product Name',
  },
  {
    id: 3,
    image: 'http://lorempixel.com/500/500/food',
    price: 89,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, mollitia qui! Nisi fugit consectetur sint illum reiciendis et error nihil quia, facilis sit excepturi. Odit officiis magnam nam vel perferendis.',
    name: 'Product Name',
  },
  {
    id: 4,
    image: 'http://lorempixel.com/500/500/food',
    price: 89,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, mollitia qui! Nisi fugit consectetur sint illum reiciendis et error nihil quia, facilis sit excepturi. Odit officiis magnam nam vel perferendis.',
    name: 'Product Name',
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(6),
  },
  content: {
    marginTop: theme.spacing(2),
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}));

const ButtonBases = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ProductsToolbar></ProductsToolbar>
      <div className={classes.content}>
        <Grid container spacing={3}>
          {products.map(product => (
            <Grid item key={product.id} lg={4} md={6} xs={12}>
              <ProductCard product={product}></ProductCard>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default ButtonBases;
