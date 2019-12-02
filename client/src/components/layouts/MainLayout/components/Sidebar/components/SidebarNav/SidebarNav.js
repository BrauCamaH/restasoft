import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { List, ListItem, Button, colors } from '@material-ui/core';
import { RoleManager } from '../../../../../../tools';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main,
    },
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const SidebarNav = props => {
  const { pages } = props;
  const classes = useStyles();

  return (
    <List>
      {pages.map(page => (
        <ListItem key={page.title} className={classes.item}>
          {page.title === 'Users' || page.title == 'Dashboard' ? (
            <RoleManager
              component={
                <Button
                  activeClassName={classes.active}
                  className={classes.button}
                  component={CustomRouterLink}
                  to={page.href}>
                  <div className={classes.icon}>{page.icon}</div>
                  {page.title}
                </Button>
              }
            />
          ) : (
            <Button
              activeClassName={classes.active}
              className={classes.button}
              component={CustomRouterLink}
              to={page.href}>
              <div className={classes.icon}>{page.icon}</div>
              {page.title}
            </Button>
          )}
        </ListItem>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  pages: PropTypes.array.isRequired,
};
export default SidebarNav;
