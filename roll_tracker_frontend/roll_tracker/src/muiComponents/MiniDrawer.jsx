import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import FollowTheSignsTwoToneIcon from '@mui/icons-material/FollowTheSignsTwoTone';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/roll-tracker-high-resolution-logo-transparent.png';





const drawerWidth = 180;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  marginTop: '20px',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      // width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    // Add additional padding to the Toolbar to make it thicker
    '& .MuiToolbar-root': {
      padding: '50px', // You can adjust this value as needed
    },
  }));
  

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer({handleLogout, userToken}) {

  const menuItems = [
    {
      label: 'Home',
      icon: <HomeTwoToneIcon />,
      path: "/"
    },
    {
      label: 'Start Here',
      icon: <FollowTheSignsTwoToneIcon />,
      path: '/start-here',
    },
    {
      label: 'Scoring',
      icon: <EmojiEventsTwoToneIcon />,
      path: '/scoring'
    },
    {
      label: 'Profile',
      icon: <AccountBoxTwoToneIcon />,
      path: '/profile',
    },
    {
        label: 'Hunt Log',
        icon: <EditNoteTwoToneIcon />,
        path: '/hunt-log'
      }
  ];

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(true);
  };

  // const handleLogin = () => {
  //   if (!userToken) {
  //     // If the user is not logged in, navigate to the login page.
  //     navigate('/login');
  //   }
  // };

  // const handleItemClick = (path) => {
  //   if (path === '/hunt-log' || path === '/profile') {
  //     // Check if the user is not logged in
  //     if (!userToken) {
  //       // If the user is not logged in, navigate to the login page.
  //       navigate('/login');
  //     } else {
  //       navigate(path);
  //     }
  //   } else {
  //     navigate(path);
  //   }
  // };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <AppBar position="fixed" open={open} sx={{ height:150, backgroundColor:'#2a4f60'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} id="main-logo"/>
          {/* <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography> */}
          {userToken ? 
          (
          <Button onClick={handleLogout} variant="outlined" id="log-in-out">Logout</Button>
          )
          :
          (
          <Link to="/login">
          <Button onClick={handleLogout} variant="outlined" id="log-in-out">Login</Button>
          </Link>
          )
          }

        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{ backgroundColor:'#2a4f60'}}>
        <DrawerHeader sx={{ height:130, backgroundColor:'#2a4f60'}}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{backgroundColor:'#2a4f60'}}>
        {menuItems.map((item, index) => (
          <ListItem key={item.label} disablePadding sx={{ color: '#67bace' }}>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon sx={{ color: '#d59f48' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))} 





      </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}