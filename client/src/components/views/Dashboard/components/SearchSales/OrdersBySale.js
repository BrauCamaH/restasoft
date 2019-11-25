import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const OrdersBySale = props => {
  const { orders } = props;
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {orders.map(order => (
        <ListItem key={order.id}>
          <ListItemAvatar>
            <Avatar
              alt='Product Image'
              src={
                order.product.image === ''
                  ? 'https://live.staticflickr.com/65535/40681390113_f02aa47381_b.jpg'
                  : `/${order.product.image.substring(8)}`
              }
            />
          </ListItemAvatar>
          <ListItemText primary='Product' secondary={order.product.name} />
          <ListItemText primary='Quantity' secondary={order.quantity} />
          <ListItemText primary='Price' secondary={order.price} />
          <ListItemText
            primary='Total'
            secondary={order.quantity * order.price}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default OrdersBySale;
