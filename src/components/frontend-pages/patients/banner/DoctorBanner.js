import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import DoctorImage from 'src/assets/images/frontend-pages/patients/doctor-patient.jpg';

const DoctorBanner = () => {
  return (
    <Box
      sx={{
        pt: { xs: 6, sm: 8, md: 10 },
        pb: { xs: 6, sm: 8, md: 10 },
        px: { xs: 2, sm: 4, md: 8 },
        bgcolor: '#f5f8fd', // very light blue/gray
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
        <Grid container spacing={6} alignItems="center" justifyContent="center">
          {/* Left: Doctor Image */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              component="img"
              src={DoctorImage}
              alt="Doctor with patient"
              sx={{
                width: { xs: '100%', sm: 480, md: 600 },
                height: { xs: 260, sm: 340, md: 400 },
                objectFit: 'cover',
                borderRadius: 0,
                boxShadow: 2,
              }}
            />
          </Grid>
          {/* Right: Text */}
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h3"
              fontWeight={700}
              sx={{
                mb: 3,
                fontSize: { xs: '2rem', md: '2.5rem' },
                color: '#222',
                lineHeight: 1.2,
              }}
            >
              Get <span style={{ color: '#3b5bfd' }}>Prescriptions</span> from a <br />
              <span style={{ color: '#3b5bfd' }}>Doctor Who Knows You.</span>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#222',
                fontSize: { xs: '1.1rem', md: '1.15rem' },
                mb: 3,
                maxWidth: 600,
                fontWeight: 400,
                mx: { xs: 'auto', md: 0 },
              }}
            >
              Your primary care doctor knows your full medical history, including past conditions, allergies, and ongoing treatments, giving them the most accurate insight into your health needs.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#222',
                fontSize: { xs: '1.1rem', md: '1.15rem' },
                mb: 0,
                maxWidth: 600,
                fontWeight: 400,
                mx: { xs: 'auto', md: 0 },
              }}
            >
              Unlike many telemedicine providers, your doctor can prescribe the right medication confidently and efficiently, often ensuring it's covered by your insurance and avoiding unnecessary out-of-pocket costs.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DoctorBanner; 