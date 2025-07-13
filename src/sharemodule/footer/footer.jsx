import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Stack,
  IconButton
} from '@mui/material';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.900', // Dark background color
        color: 'white',
        py: 6, // Padding top and bottom
        mt: 'auto', // Push footer to the bottom of the page if content is short
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">

          {/* About Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
                PVT .store
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                Your go-to destination for amazing products across fragrances, beauty, groceries, and more.
              </Typography>
            </Box>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={6} sm={3} md={2}>
            <Box>
              <Typography variant="h6" component="h4" gutterBottom sx={{ fontWeight: 'medium', color: 'white' }}>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                <Link href="#" color="inherit" underline="hover" variant="body2" sx={{ color: 'grey.400' }}>
                  Home
                </Link>
                <Link href="#" color="inherit" underline="hover" variant="body2" sx={{ color: 'grey.400' }}>
                  About Us
                </Link>
                <Link href="#" color="inherit" underline="hover" variant="body2" sx={{ color: 'grey.400' }}>
                  Contact
                </Link>
                <Link href="#" color="inherit" underline="hover" variant="body2" sx={{ color: 'grey.400' }}>
                  Privacy Policy
                </Link>
              </Stack>
            </Box>
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={6} sm={3} md={2}>
            <Box>
              <Typography variant="h6" component="h4" gutterBottom sx={{ fontWeight: 'medium', color: 'white' }}>
                Follow Us
              </Typography>
              <Stack direction="row" spacing={2}>
                {/* We use IconButton for better interaction, wrapping the FontAwesome icon */}
                <IconButton
                  aria-label="facebook"
                  sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}
                  href="#"
                >
                  <i className="fab fa-facebook-f" />
                </IconButton>
                <IconButton
                  aria-label="instagram"
                  sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}
                  href="#"
                >
                  <i className="fab fa-instagram" />
                </IconButton>
                <IconButton
                  aria-label="twitter"
                  sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}
                  href="#"
                >
                  <i className="fab fa-twitter" />
                </IconButton>
                <IconButton
                  aria-label="youtube"
                  sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}
                  href="#"
                >
                  <i className="fab fa-youtube" />
                </IconButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom (Copyright) */}
        <Box
          sx={{
            textAlign: 'center',
            mt: 6,
            pt: 3,
            borderTop: '1px solid',
            borderColor: 'grey.700',
          }}
        >
          <Typography variant="body2" sx={{ color: 'grey.500' }}>
            &copy; {new Date().getFullYear()} PVT .store | All rights reserved
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;