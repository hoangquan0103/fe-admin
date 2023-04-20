import React, { useState } from 'react';
import {
  Card,
  Box,
  InputBase,
  TextField,
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Typography,
  Button,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { setCountNotifi } from '../store/Module.action';
import { useNavigate } from 'react-router-dom';
function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEls, setAnchorEls] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isNotifiOpen = Boolean(anchorEls);
  const [isLogout, setIsLogout] = useState(false);
  const menuId = 'primary-search-account-menu';
  const count = useSelector((state) => state?.countNotifi);
  const listOrders = useSelector((state) => state?.listOrders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileNotifiOpen = (event) => {
    setAnchorEls(event.currentTarget);
    dispatch(setCountNotifi(0));
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleNotifiClose = () => {
    setAnchorEls(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>
        <PersonOutlineIcon sx={{ marginRight: 2 }} />
        My Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <EditOutlinedIcon sx={{ marginRight: 2 }} />
        Edit Profile
      </MenuItem> */}
      <MenuItem
        onClick={() => {
          handleMenuClose();
          localStorage.removeItem('USER_KEY');
          window.location.reload(false);
        }}
      >
        <LoginOutlinedIcon sx={{ marginRight: 2 }} />
        Logout
      </MenuItem>
    </Menu>
  );
  const notifiId = 'notifiId';
  // const renderNotifi = (
  //   <>
  //     <Menu
  //       anchorEl={anchorEl}
  //       anchorOrigin={{
  //         vertical: "top",
  //         horizontal: "right",
  //       }}
  //       id={notifiId}
  //       keepMounted
  //       open={isNotifiOpen}
  //       onClose={handleNotifiClose}
  //     >
  //       {listOrders.slice(0, 3).map((item, index) => (
  //         <MenuItem
  //           onClick={handleNotifiClose}
  //           sx={{ fontFamily: "Roboto Slab" }}
  //         >
  //           {item.name} vua dat mot don moi
  //         </MenuItem>
  //       ))}
  //     </Menu>
  //   </>
  // );

  return (
    <>
      <Box
        sx={{
          width: '79%',
          height: 50,
          backgroundColor: 'white',
          borderWidth: 1,
          borderStyle: 'solid',
          borderRadius: 2,
          borderColor: 'rgb(213,219,225)',
          display: 'flex',
          paddingLeft: 3,
          justifyContent: 'space-between',
          position: 'fixed',
          right: 5,
          left: '19.9%',
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <InputBase
            type="search"
            placeholder="Search here"
            style={{
              width: 250,
              height: 40,
              borderRadius: 5,
              outline: 'none',
              paddingLeft: 40,
              paddingRight: 3,
              fontSize: 15,
              borderColor: 'rgb(213,219,225)',
              borderWidth: 1,
              borderStyle: 'solid',
              color: 'rgb(22,41,56)',
              marginRight: 20,
            }}
          />
          <SearchOutlinedIcon
            sx={{
              position: 'relative',
              left: -260,
            }}
          />
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {/* <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            aria-controls={notifiId}
            onClick={handleProfileNotifiOpen}
          >
            <Badge badgeContent={count} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          {localStorage.getItem('USER_KEY') ? (
            <IconButton
              size="large"
              aria-controls={menuId}
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          ) : (
            <Button
              sx={{ color: 'black' }}
              onClick={() => {
                navigate('/login');
              }}
            >
              {' '}
              Login{' '}
            </Button>
          )}
        </Box>
      </Box>
      {renderMenu}
    </>
  );
}

export default Header;
