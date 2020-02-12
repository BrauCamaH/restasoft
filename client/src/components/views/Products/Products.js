import React, { useState, useEffect, createContext } from 'react';
import { ProductCard, ProductsToolbar } from './components';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { useSnackbar } from 'notistack';
import axios from 'axios';

import { EmptyPlaceholder } from '../../tools';
import { LinearProgress } from '@material-ui/core';

const ProductsContext = createContext({
  products: [],
  addProduct: product => {},
  deleteProduct: id => {},
  updateProduct: product => {},
  setProducts: products => {},
});

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
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

const Products = ({ match }) => {
  const {
    params: { category },
  } = match;

  const classes = useStyles();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [loading, setIsloading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setIsloading(true);
    axios
      .get(`/api/products/${category}`)
      .then(res => {
        setProducts(res.data);
        setIsloading(false);
      })
      .catch(err => {
        console.error(err);
        setIsloading(false);
      });
  }, [category]);

  const addProduct = product => {
    const data = new FormData();

    const image =
      product.image !== '' ? product.image : './category-default.png';
    const name = product.name;
    const price = product.price;
    const description = product.description;

    data.append('name', name);
    data.append('price', price);
    data.append('description', description);
    data.append('image', image);
    data.append('category', category);

    axios
      .post(`/api/products`, data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(res => {
        //console.log(res.data);
        const updatedProducts = [...products];
        updatedProducts.push(res.data);
        setProducts(updatedProducts);

        enqueueSnackbar('Product Added', {
          variant: 'success',
        });
        setTimeout(closeSnackbar, 2000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteProduct = id => {
    //console.log(`Deleting category with id ${id}`);
    const updatedProducts = [...products];
    const updatedItemIndex = updatedProducts.findIndex(item => item.id === id);

    updatedProducts.splice(updatedItemIndex, 1);

    setProducts(updatedProducts);

    axios
      .delete(`/api/products/${id}`)
      .then(res => {
        enqueueSnackbar('Product Eliminated', {
          variant: 'success',
        });
        setTimeout(closeSnackbar, 2000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateProduct = product => {
    const data = new FormData();
    const id = product.id;

    const image = product.image;
    const name = product.name;
    const price = product.price;
    const description = product.description;

    data.append('name', name);
    data.append('price', price);
    data.append('description', description);
    data.append('image', image);

    axios
      .put(`/api/products/${id}`, data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(res => {
        const updatedProducts = [...products];
        const updatedItemIndex = updatedProducts.findIndex(
          item => item.id === id
        );
        product.image = res.data.image;
        updatedProducts[updatedItemIndex] = product;
        setProducts(updatedProducts);
        enqueueSnackbar('Category Updated', {
          variant: 'success',
        });
        setTimeout(closeSnackbar, 2000);
      })
      .catch(err => {
        console.log(err);
        enqueueSnackbar('Error Ocurred', {
          variant: 'error',
        });
        setTimeout(closeSnackbar, 2000);
      });
  };

  return (
    <ProductsContext.Provider
      value={{
        products: products,
        setProducts: setProducts,
        addProduct: addProduct,
        deleteProduct: deleteProduct,
        updateProduct: updateProduct,
      }}>
      <div className={classes.root}>
        <ProductsToolbar
          loading={loading}
          category={category}></ProductsToolbar>
        {loading ? (
          <LinearProgress className={classes.content} />
        ) : (
          <div className={classes.content}>
            {products.length >= 1 ? (
              <Grid container spacing={3}>
                {products.map(product => (
                  <Grid item key={product.id} lg={4} md={6} xs={12}>
                    <ProductCard product={product}></ProductCard>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <EmptyPlaceholder />
            )}
          </div>
        )}
      </div>
    </ProductsContext.Provider>
  );
};

export default Products;

export { ProductsContext };
