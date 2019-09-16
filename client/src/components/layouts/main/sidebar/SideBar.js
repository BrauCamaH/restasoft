import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import SidebarNav from './SidebarNav';
import DashboardIcon from '@material-ui/icons/Dashboard';

const pages = [
  {
    title: 'Sales',
    icon: <DashboardIcon></DashboardIcon>,
  },
];

export default function Sidebar(props) {
  const { mobileOpen, container, classes, onDrawerToggle } = props;

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <SidebarNav pages={pages}></SidebarNav>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label='mailbox folders'>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation='css'>
        <Drawer
          container={container}
          variant='temporary'
          anchor={'left'}
          open={mobileOpen}
          onClose={onDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation='css'>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant='permanent'
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}
