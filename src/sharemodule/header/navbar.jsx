import * as React from 'react';
import { 
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
  Avatar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert'; // Added missing import
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [mobileNavAnchor, setMobileNavAnchor] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isMobileNavOpen = Boolean(mobileNavAnchor);

  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const profilePic = localStorage.getItem('img');

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileNavOpen = (event) => {
    setMobileNavAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
    setMobileNavAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('first_name');
    localStorage.removeItem('img');
    handleMenuClose();
    navigate('/login');
  };

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
  
    { name: 'Contact Us', path: '/contact' },
    { name: 'Blog', path: '/blog' },
    {name:'whyus',path:'/whyus'}
  ];

  // Profile menu
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      {!isLoggedIn ? (
        <>
          <MenuItem onClick={() => { handleMenuClose(); navigate('/login'); }}>Login</MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); navigate('/register'); }}>Register</MenuItem>
        </>
      ) : (
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      )}
    </Menu>
  );

  // Mobile navigation menu (for Home/About/Contact)
  const renderMobileNavMenu = (
    <Menu
      anchorEl={mobileNavAnchor}
      open={isMobileNavOpen}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      {navLinks.map((link) => (
        <MenuItem 
          key={link.name} 
          component={Link} 
          to={link.path}
          onClick={handleMenuClose}
        >
          {link.name}
        </MenuItem>
      ))}
    </Menu>
  );

  // Mobile action menu (Cart + Profile)
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      id={mobileMenuId}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuItem onClick={() => { handleMenuClose(); navigate('/cart'); }}>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={0} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar src={profilePic || ''} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Mobile menu button */}
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileNavOpen}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Typography 
            variant="h6" 
            noWrap 
            component={Link} 
            to="/"
            sx={{ 
              flexGrow: isMobile ? 1 : 0,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
              fontSize: '1.5rem'
            }}
          >
            PVT .store
          </Typography>

          {/* Desktop Navigation Links */}
          {!isMobile && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexGrow: 1,
              gap: 4,
              ml: 4
            }}>
              {navLinks.map((link) => (
                <Typography 
                  key={link.name}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 'medium',
                    fontSize: '1.1rem',
                    '&:hover': {
                      textDecoration: 'underline',
                      textUnderlineOffset: '4px'
                    }
                  }}
                >
                  {link.name}
                </Typography>
              ))}
            </Box>
          )}

          {/* Right-side icons */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 1
          }}>
            <IconButton 
              size="large" 
              color="inherit" 
              onClick={() => navigate('/cart')}
              aria-label="cart"
            >
              <Badge badgeContent={0} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar src={profilePic || ''} alt="Profile" />
            </IconButton>

            {/* Mobile more button */}
            {isMobile && (
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      {renderMobileNavMenu}
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}