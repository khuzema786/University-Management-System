import React, { useState } from 'react';
import clsx from 'clsx';

import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Badge,
  Container
} from '../materialProps';
import { MenuIcon, ChevronLeftIcon, NotificationsIcon } from '../materialIcons';
import { dashStyle } from '../materialStyles';

import { Navigation, Conductor } from '../';

// Colleges, Courses, Fees, Attendance, Teachers

function Dashboard() {
  const classes = dashStyle();
  const [open, setOpen] = useState(true);
  const [category, setCategory] = useState(1);

  const handleDrawerOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleDrawerClose = (event) => {
    event.preventDefault();
    setOpen(false);
  };

  const pageToDisplay = () => {
    return <Conductor category={category} />; // 1
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            STUDENT MANAGEMENT SYSTEM
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon style={{ color: 'white' }} />
          </IconButton>
        </div>
        <Divider />
        <List>
          <Navigation setCategory={setCategory} />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {pageToDisplay()}
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;
