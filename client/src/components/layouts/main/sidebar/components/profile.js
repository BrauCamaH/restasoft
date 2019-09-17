import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography } from '@material-ui/core';

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

const Profile = () => {
  const classes = useStyles();

  const user = {
    name: 'Braulio Camarena',
    avatar: '',
    type: 'Restaurant Administrator',
  };
  return (
    <div className={classes.root}>
      <Avatar
        alt='Person'
        className={classes.avatar}
        src={user.avatar}
      />
      <Typography className={classes.name} variant='h4'>
        {user.name}
      </Typography>
      <Typography variant='body2'>{user.type}</Typography>
    </div>
  );
};

export default Profile;