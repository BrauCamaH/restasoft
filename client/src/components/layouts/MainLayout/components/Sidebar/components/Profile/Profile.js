import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
  },
}));

const Profile = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const user = {
    name: 'Braulio Camarena',
    avatar: <SupervisorAccountIcon color='primary' />,
    type: 'Restaurant Administrator',
  };
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar alt='Person' className={classes.avatar} component={RouterLink} to='/account'>
        {user.avatar}
      </Avatar>
      <Typography className={classes.name} variant='h4'>
        {user.name}
      </Typography>
      <Typography variant='body2'>{user.type}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
