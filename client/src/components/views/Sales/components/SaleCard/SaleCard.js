import React, { useState } from 'react';
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

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 500,
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
    display: 'flex',
    justifyContent: 'right',
    margin: theme.spacing(0.5),
  },
  chipIcon: {
    backgroundColor: theme.palette.white,
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
  const { className, ...rest } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
              $2,300
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
              label='Client'
              variant='outlined'
            />
          </Grid>
          <Grid item>
            <Chip
              icon={<EventSeatIcon className={classes.chipIcon} />}
              label='Table'
              variant='outlined'
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} className={classes.orders}>
            <Badge
              style={{ width: '100%' }}
              color='secondary'
              badgeContent={4}
              className={classes.margin}>
              <Button fullWidth variant='contained'>
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
        <Menu open={open} onClose={handleClose} onClick={handleClose}>
          <MenuItem>Edit</MenuItem>
          <MenuItem>Finish</MenuItem>
        </Menu>
      </Grid>
    </Card>
  );
};

SaleCard.propTypes = {
  className: PropTypes.string,
};

export default SaleCard;
