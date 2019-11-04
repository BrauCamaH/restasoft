import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import AlertDialog from '../../../../tools/AlertDialog';

import { ProductsContext } from '../../Products';

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  card: {
    //width: 250,
    //height: 300,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

const Product = props => {
  const { product, ...rest } = props;
  const classes = useStyles();
  const context = useContext(ProductsContext);

  const [openAlert, setOpenAlert] = useState(false);

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleDelete = () => {
    context.deleteProduct(product.id);
  };

  const EditAndDelete = () => {
    const isAdmind = true;
    return isAdmind ? (
      <div>
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleOpenAlert}>
          <DeleteIcon />
        </IconButton>
      </div>
    ) : (
      <div />
    );
  };

  return (
    <div>
      <Card {...rest} className={classes.card}>
        <CardHeader
          action={<EditAndDelete></EditAndDelete>}
          title={product.name}
          subheader={`Price: $${product.price}`}></CardHeader>
        <CardMedia
          className={classes.media}
          image={`/${product.image.substring(8)}`}
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {product.description}
          </Typography>
        </CardContent>
      </Card>

      <div>
        <AlertDialog
          open={openAlert}
          title='Are you sure?'
          contentText={'The action will delete the current product'}
          onClose={handleCloseAlert}
          onAgree={handleDelete}
        />
      </div>
    </div>
  );
};

export default Product;
