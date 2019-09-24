import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { Sidebar, Topbar } from './components';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    fontWeight: theme.typography.fontWeightMedium,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    height: '100%',
  },
}));

const MainLayout = props => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { children } = props;

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  return (
    <div className={classes.root}>
      <CssBaseline>
        <Topbar classes={classes} onDrawerToggle={handleDrawerToggle}></Topbar>
        <Sidebar
          classes={classes}
          onDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
        ></Sidebar>
        <main className='classes content'>{children}</main>
      </CssBaseline>
    </div>
  );
};

MainLayout.propTypes= {
  children : PropTypes.node
};

export default MainLayout;
