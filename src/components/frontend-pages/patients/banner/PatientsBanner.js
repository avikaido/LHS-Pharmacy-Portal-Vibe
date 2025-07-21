import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import MedicalBannerBg from 'src/assets/images/frontend-pages/patients/medical-banner-bg.jpg';

const PatientsBanner = () => {
  return (
    <Box
      sx={{
        pt: { xs: 6, sm: 8, md: 10 },
        pb: { xs: 6, sm: 8, md: 10 },
        px: { xs: 2, sm: 4, md: 8 },
        bgcolor: '#f5f8fd',
        backgroundImage: `url(${MedicalBannerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: { xs: 320, md: 400 },
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        borderRadius: 0,
      }}
    >
      <Container
        sx={{
          maxWidth: '1400px !important',
          position: 'relative',
          px: { xs: 2, sm: 4, md: 8 },
          py: 0,
        }}
      >
        <Grid container spacing={3} justifyContent="center" alignItems="center" mb={4}>
          {/* Left: Text and Button */}
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h2"
              fontWeight={700}
              lineHeight={1.1}
              sx={{
                mb: 3,
                fontSize: '58px',
                color: '#fff',
              }}
            >
              <span style={{ color: '#fff', fontWeight: 800 }}>Your </span>
              <span style={{ color: '#222', fontWeight: 800 }}>Health.</span> <span style={{ color: '#fff', fontWeight: 800 }}>Your </span>
              <span style={{ color: '#222', fontWeight: 800 }}>Doctor.</span>
              <br />
              <span style={{ color: '#fff', fontWeight: 800 }}>One Tap Away.</span>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#fff',
                fontSize: { xs: '1rem', md: '1.1rem' },
                mb: 3,
                maxWidth: 400,
                fontWeight: 400,
                mx: { xs: 'auto', md: 0 },
              }}
            >
              Skip the confusion and risks of telemedicine apps. Get your prescriptions from your trusted primary care physician—quickly, safely, and covered by insurance.
            </Typography>
            <Button
              variant="contained"
              size="large"
              href="#"
              sx={{
                background: '#3b5bfd',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.1rem',
                px: 4,
                py: 1.5,
                borderRadius: '12px',
                boxShadow: '0 2px 8px 0 rgba(80, 112, 255, 0.15)',
                textTransform: 'none',
                '&:hover': {
                  background: '#254edb',
                },
              }}
            >
              Get Started Now
            </Button>
          </Grid>
          {/* Right: Video */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, alignItems: 'center' }}>
            <Box
              sx={{
                width: { xs: 320, sm: 420, md: 520 },
                height: { xs: 180, sm: 240, md: 300 },
                background: 'rgba(255,255,255,0.85)',
                boxShadow: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderRadius: 0,
              }}
            >
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/yG108c2j2dQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ borderRadius: 0 }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PatientsBanner; 