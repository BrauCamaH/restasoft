import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CategoryItem, CategoriesToolbar } from './components';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';

// const categories = [
//   {
//     id: 1,
//     url: 'http://lorempixel.com/500/500/food',
//     title: 'Breakfast',
//   },
//   {
//     id: 2,
//     url: 'http://lorempixel.com/500/500/food',
//     title: 'Burgers',
//   },
//   {
//     id: 3,
//     url: 'http://lorempixel.com/500/500/food',
//     title: 'Camera',
//   },
//   {
//     id: 4,
//     url: 'http://lorempixel.com/500/500/food',
//     title: 'Drinks',
//   },
// ];

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(6)
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
  gridItem :{
    minWidth : 350,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
}));

const ButtonBases = () => {
  const classes = useStyles();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`api/categories`)
      .then(res => {
        setCategories(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div className={classes.root}>
      <CategoriesToolbar />
      <div className={classes.content}>
        <Grid container spacing={3}>
          {categories.map(category => (
            <Grid className= {classes.gridItem} item key={category.id} lg={4} md={6} xs={12}>
              <CategoryItem category={category}></CategoryItem>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default ButtonBases;
