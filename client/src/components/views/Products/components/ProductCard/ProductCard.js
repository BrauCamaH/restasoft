import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  Menu,
  MenuItem,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});
const EditAndDelete = props => {
  const isAdmind = true;
  return isAdmind ? (
    <div>
      <IconButton>
        <EditIcon />
      </IconButton>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </div>
  ) : (
    <div />
  );
};
const Product = props => {
  const { product, ...rest } = props;
  const classes = useStyles();
  return (
    <Card {...rest} className={classes.card}>
      <CardHeader
        action={<EditAndDelete></EditAndDelete>}
        title={product.name}
        subheader={`Price: ${product.price}$`}
      ></CardHeader>
      <CardMedia className={classes.media} image={product.image} />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <div>
          <Menu>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Delete</MenuItem>
          </Menu>
        </div>
      </CardActions>
    </Card>
  );
};

export default Product;