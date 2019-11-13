import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Chip,
  Badge,
  Button,
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FaceIcon from '@material-ui/icons/Face';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import FormDialog from '../../../../tools/FormDialog';
import Orders from '../Orders';

import useAxios from 'axios-hooks';

import { SalesContext } from '../../Sales';
import { AlertDialog } from '../../../../tools';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 600,
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  options: {
    padding: theme.spacing(0.5),
    alignItems: 'center',
    display: 'flex',
  },
  chipIcon: {
    color: theme.palette.primary.light,
  },
  chips: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orders: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
  },
}));

const SaleCard = props => {
  const { sale, className, ...rest } = props;
  const context = useContext(SalesContext);
  const [orders, setOrders] = useState([]);

  const [{ data: client, error: clientError }, refetchClient] = useAxios(
    `/api/clients/${sale.client}`
  );

  const [{ data: table, error: tableError }, refetchTable] = useAxios(
    `/api/tables/${sale.table}`
  );

  useEffect(() => {
    setOrders(context.getOrdersBySale(sale.id));

    refetchClient();
    refetchTable();
  }, []);

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpen = event => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleDelete = () => {
    context.deleteSale(sale.id);
  };

  const alert = (
    <AlertDialog
      title='Are you sure?'
      contentText='The action will delete the current sale'
      open={openAlert}
      onClose={() => setOpenAlert(false)}
      onAgree={handleDelete}
    />
  );

  const formDialog = (
    <FormDialog
      title='Orders'
      component={<Orders orders={orders} />}
      open={openFormDialog}
      onClose={() => {
        setOpenFormDialog(false);
      }}
    />
  );

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify='space-between'>
          <Grid item>
            <Typography
              className={classes.title}
              color='inherit'
              gutterBottom
              variant='body2'>
              TOTAL
            </Typography>
            <Typography color='inherit' variant='h3'>
              {sale.total}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <Grid container className={classes.chips}>
          <Grid item>
            <Chip
              icon={<FaceIcon className={classes.chipIcon} />}
              label={client ? client.name : ''}
              variant='outlined'
            />
          </Grid>
          <Grid item>
            <Chip
              icon={<EventSeatIcon className={classes.chipIcon} />}
              label={table ? table.code : ''}
              variant='outlined'
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} className={classes.orders}>
            <Badge
              style={{ width: '100%' }}
              color='secondary'
              badgeContent={orders.length}
              className={classes.margin}>
              <Button
                fullWidth
                variant='contained'
                onClick={() => {
                  setOpenFormDialog(true);
                }}>
                <Typography color='inherit' color='primary' variant='subtitle1'>
                  Orders
                </Typography>
              </Button>
            </Badge>
          </Grid>
        </Grid>
      </CardContent>
      <Grid className={classes.options}>
        <IconButton onClick={handleOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
          onClick={handleClose}>
          <MenuItem>Edit</MenuItem>
          <MenuItem>Finish</MenuItem>
          <MenuItem
            onClick={() => {
              setOpenAlert(true);
            }}>
            Delete
          </MenuItem>
        </Menu>
        {alert}
        {formDialog}
      </Grid>
    </Card>
  );
};

SaleCard.propTypes = {
  className: PropTypes.string,
};

export default SaleCard;
