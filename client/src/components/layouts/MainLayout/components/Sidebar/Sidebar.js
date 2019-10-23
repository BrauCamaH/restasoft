import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ReceiptIcon from '@material-ui/icons/Receipt';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import { makeStyles } from '@material-ui/core/styles';
import { SidebarNav, Profile } from './components';

const useStyles = makeStyles(theme => ({
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

const pages = [
  {
    title: 'Sales',
    href: '/sales',
    icon: <DashboardIcon />,
  },
  {
    title: 'Orders',
    href: '/orders',
    icon: <ReceiptIcon />,
  },
  {
    title: 'Products',
    href: '/categories',
    icon: <FastfoodIcon />,
  },
  {
    title: 'Tables',
    href: '/tables',
    icon: <EventSeatIcon />,
  },
  {
    title: 'Clients',
    href: '/clients',
    icon: <AssignmentInd />,
  },
];

export default function Sidebar(props) {
  const { mobileOpen, container, classes, onDrawerToggle } = props;
  const style = useStyles();

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Profile />
      <Divider className={style.divider} />
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
