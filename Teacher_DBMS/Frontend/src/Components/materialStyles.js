import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export const dashStyle = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: '#20b2aa'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    backgroundColor: '#20b2aa'
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  }
}));

export const tabStyle = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  },
  searchInput: {
    width: '75%',
    color: '#20b2aa'
  },
  newButton: {
    position: 'absolute',
    right: '10px',
    color: '#20b2aa',
    border: '2px solid #20b2aa'
  },
  newButtonhover: {
    border: '2px solid #20b2aa'
  },
  primary: {
    color: '#20b2aa',
    main: '#20b2aa',
    light: '#20b2aa'
  }
}));

export const tableStyle = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',
      color: 'black',
      backgroundColor: '#20b2aa'
    },
    '& tbody td': {
      fontWeight: '300'
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer'
    }
  }
}));

export const formStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1)
    }
  }
}));

export const actionStyle = makeStyles((theme) => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5)
  },
  secondary: {
    backgroundColor: theme.palette.secondary.light,
    '& .MuiButton-label': {
      // color: theme.palette.secondary.main
      color: '#ffffff'
    }
  },
  primary: {
    backgroundColor: theme.palette.primary.light,
    '& .MuiButton-label': {
      color: theme.palette.primary.main,
      color: '#ffffff'
    }
  }
}));

export const btnStyle = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5)
  },
  label: {
    textTransform: 'none'
  }
}));

export const confStyle = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
  },
  dialogTitle: {
    textAlign: 'center'
  },
  dialogContent: {
    textAlign: 'center'
  },
  dialogAction: {
    justifyContent: 'center'
  },
  titleIcon: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      cursor: 'default'
    },
    '& .MuiSvgIcon-root': {
      fontSize: '8rem'
    }
  }
}));

export const popStyle = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
  },
  dialogTitle: {
    paddingRight: '0px'
  }
}));

export const pageStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fdfdff'
  },
  pageHeader: {
    padding: theme.spacing(4),
    display: 'flex',
    marginBottom: theme.spacing(2)
  },
  pageIcon: {
    display: 'inline-block',
    padding: theme.spacing(2),
    color: '#20b2aa'
  },
  pageTitle: {
    paddingLeft: theme.spacing(4),
    '& .MuiTypography-subtitle2': {
      opacity: '0.6'
    }
  }
}));

export const notifStyle = makeStyles((theme) => ({
  root: {
    top: theme.spacing(9)
  }
}));
