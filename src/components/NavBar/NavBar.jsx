import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Avatar,
  Drawer,
  useMediaQuery,
} from '@mui/material';
import {
  Menu,
  AccountCircle,
  Brightness7,
  Brightness4,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import Sidebar from '../SideBar/SideBar';

import useStyles from './styles';

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const theme = useTheme();
  const isAuthenticated = true;

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => {
                setMobileOpen((prevMobileOpen) => !prevMobileOpen);
              }}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" onClick={() => {}} sx={{ ml: 1 }}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && 'Search...'}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={() => {}}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                onClick={() => {}}
                component={Link}
                to="/profile/:id"
                className={classes.linkButton}
              >
                {!isMobile && <>My movies &nbsp;</>}
                <Avatar
                  style={{ width: '30px', height: '30px' }}
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                  alt="profile"
                />
              </Button>
            )}
          </div>
          {isMobile && 'Search...'}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClick={() => {
                setMobileOpen((prevMobileOpen) => !prevMobileOpen);
              }}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              classes={{ paper: classes.drawerPaper }}
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
}
export default NavBar;
