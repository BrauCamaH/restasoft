import React, { useState, useContext, forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import AlertDialog from '../../../../tools/AlertDialog';

import { CategoriesContext } from '../../Categories';

import CategoryFormDialog from '../CategoryForm';

import {
  Card,
  CardContent,
  CardActions,
  Box,
  Divider,
  ButtonBase,
  Button,
  ButtonGroup,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  image: {
    position: 'relative',
    height: 300,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.6,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) +
      6}px`,
  },
  description: {
    padding: 5,
    marginTop: theme.spacing(2),
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
}));
const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const CategoryItem = props => {
  const { category, ...rest } = props;
  const classes = useStyles();

  const image =
    category.image === 0 || category.image === ''
      ? 'url(https://live.staticflickr.com/65535/40681390113_f02aa47381_b.jpg)'
      : `url(/${category.image.substring(8)})`;

  const context = useContext(CategoriesContext);

  const [openEdit, setOpenEdit] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleDelete = () => {
    context.deleteCategory(category.id);
  };

  return (
    <div>
      <Card {...rest}>
        <CardContent>
          <Card>
            <ButtonBase
              focusRipple
              key={category.id}
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              component={CustomRouterLink}
              to={`/products/${category.id}`}>
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `${image}`,
                }}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component='span'
                  variant='subtitle1'
                  color='inherit'
                  className={classes.imageTitle}>
                  {category.name}
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
          </Card>
          {category.description ? (
            <Box boxShadow={1} className={classes.description}>
              <Typography variant='h6' color='initial' component='p'>
                {category.description}
              </Typography>
            </Box>
          ) : null}
        </CardContent>
        <Divider></Divider>
        <CardActions>
          <ButtonGroup fullWidth>
            <Button color='primary' onClick={handleOpenEdit}>
              Edit
            </Button>
            <Button className={classes.deleteButton} onClick={handleOpenAlert}>
              Delete
            </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
      <div>
        <CategoryFormDialog
          category={category}
          isEditable={true}
          open={openEdit}
          onClose={handleCloseEdit}
        />
        <AlertDialog
          open={openAlert}
          title='Are you sure?'
          contentText={
            'The action will delete the current category and its products'
          }
          onClose={handleCloseAlert}
          onAgree={handleDelete}
        />
      </div>
    </div>
  );
};

export default CategoryItem;
