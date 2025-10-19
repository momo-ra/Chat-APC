import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Box, Container, Typography, Button, Link } from '@mui/material';
import { Home } from '@mui/icons-material';
import { SEOHead } from '../components/SEO/SEOHead';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  <SEOHead
    title="404 Not Found"
    description="The page you are looking for does not exist. Please check the URL and try again."
  />
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: '4rem',
              fontWeight: 700,
              color: 'primary.main',
              mb: 2,
            }}
          >
            404
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              mb: 4,
            }}
          >
            Oops! Page not found
          </Typography>
          <Button
            component={Link}
            href="/"
            variant="contained"
            startIcon={<Home />}
            sx={{
              background: 'linear-gradient(135deg, #171B83 0%, #0F1259 100%)',
              color: 'white',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(23, 27, 131, 0.3)',
              },
            }}
          >
            Return to Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
