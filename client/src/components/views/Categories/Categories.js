import React, { useState, useEffect, createContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CategoryItem, CategoriesToolbar } from './components';
import Grid from '@material-ui/core/Grid';

import { useSnackbar } from 'notistack';


import axios from 'axios';

const CategoriesContext = createContext({
  categories: [],
  addCategory: category => {},
  deleteCategory : id => {},
  editCategory : category =>{}
});   

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
  gridItem: {
    minWidth: 350,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}));

const Categories = () => {
  const classes = useStyles();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`api/categories`)
      .then(res => {
        setCategories(res.data);
        //console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const addCategory = category => {
    console.log('Adding Category ', category);
    const data = new FormData()

    const image = category.image !== '' ? category.image : './category-default.png' ;
    const name = category.name;
    const description = category.description;

    data.append('name', name );
    data.append('description', description )
    data.append('image', image);
  

    console.log(image);

    axios
      .post(`api/categories`, data, {
        headers : {
          'content-type': 'multipart/form-data'
        }
      }
      )
      .then( res=> {
        //console.log(res.data);
        const updatedCategories = [...categories];
        updatedCategories.push(res.data);
        setCategories(updatedCategories);

        enqueueSnackbar('Category Added', {
          variant: 'success',
        });
        setTimeout(closeSnackbar, 2000);
      })
      .catch( err => {
        console.log(err);
      });
  };

  const deleteCategory = id =>{
    //console.log(`Deleting category with id ${id}`);
    const updatedCategories = [...categories] ;
    const updatedItemIndex = updatedCategories.findIndex(item => item.id === id );

    updatedCategories.splice(updatedItemIndex, 1);
    
    setCategories(updatedCategories);

    axios.delete(`api/categories/${id}`)
      .then(res =>{
        enqueueSnackbar('Category Eliminated', {
          variant: 'success',
        });
        setTimeout(closeSnackbar, 2000);
      })
      .catch(err =>{
        console.log(err);
      })
  }

  const editCategory = category =>{
    console.log(`Category updated with id ${category.id}`);
  }

  return (
    <CategoriesContext.Provider
      value={{
        addCategory: addCategory,
        deleteCategory : deleteCategory,
        editCategory : editCategory
      }}
    >
      <div className={classes.root}>
        <CategoriesToolbar />
        <div className={classes.content}>
          <Grid container spacing={3}>
            {categories.map(category => (
              <Grid
                className={classes.gridItem}
                item
                key={category.id}
                lg={4}
                md={6}
                xs={12}
              >
                <CategoryItem category={category}></CategoryItem>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </CategoriesContext.Provider>
  );
};

export { CategoriesContext };
export default Categories;
