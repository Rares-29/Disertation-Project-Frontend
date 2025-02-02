import "./Navbar.css";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { UserContext } from './UserContext';
import { useContext } from 'react';



const LoggedInNavbar = ({ }) => {
  return (
    <>
      <a href = "/" className="item">Home</a>
      <a href = "/about" className="item">About us</a>
      <a href = "/map" className="item">Map</a>
    </>
  );
};

// Component for the logged-out state
const LoggedOutNavbar = ({ }) => {
  return (
    <>
      <a href = "/" className="item">Home</a>
      <a href = "/about" className="item">About us</a>
      <a href = "/map" className="item">Map</a>
      <a href = "/login" className="item">Login</a>
    </>
  );
};



const settings = [{name: 'Profile', href: "/profile"}, {name: 'Account', href: "/account"}, {name: 'Dashboard', href: "/dashboard"}, {name: 'Logout', href: "/logout"}];

function ResponsiveAppBar() {

  const {user, setUser} = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{backgroundColor: "#000"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>


          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
      {user ? <LoggedInNavbar></LoggedInNavbar> : <LoggedOutNavbar></LoggedOutNavbar>}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex' }, alignItems: 'center' }}>
          <img src="/images/logo.png" className="logo" />
            </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {user ? <LoggedInNavbar></LoggedInNavbar> : <LoggedOutNavbar></LoggedOutNavbar>}
          </Box>
          {user ? 
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><a style={{color:"rgba(var(--bs-link-color-rgb),var(--bs-link-opacity,1))"}} className="item" href = {setting.href}>{setting.name}</a></Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          :<></>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;