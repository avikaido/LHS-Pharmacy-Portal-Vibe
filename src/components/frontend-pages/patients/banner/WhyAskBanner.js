import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';

const features = [
  {
    title: 'Safe, Secure, and Governed',
    description: (
      <>
        <b>Your health, your doctor, your data.</b> Feel confident knowing that your health data is securely handled with built-in governance, ensuring compliance with HIPAA standards and full protection of your personal information.
      </>
    ),
  },
  {
    title: 'Reliable Care',
    description: (
      <>
        <b>Prescriptions provided by your care physician.</b> With Ask Your Primary, you’re getting prescriptions from your own trusted primary care physician, who knows your medical history and can provide the care you need without the guesswork.
      </>
    ),
  },
  {
    title: 'Affordable and Covered',
    description: (
      <>
        <b>No extra costs, just coverage.</b> Unlike other services that may charge you out-of-pocket, your primary care doctor’s prescriptions come at no extra cost – just insurance coverage.
      </>
    ),
  },
  {
    title: 'FDA-Regulated Pharmacies',
    description: (
      <>
        <b>Your prescription, delivered to trusted pharmacies.</b> Once your prescription is approved, it’s sent directly to the FDA-regulated pharmacy of your choice. You can trust that your medication is dispensed safely and professionally.
      </>
    ),
  },
];

const WhyAskBanner = () => {
  return (
    <Box sx={{ bgcolor: '#fff', py: { xs: 6, md: 10 }, px: { xs: 2, md: 0 }, width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
      <Container sx={{ maxWidth: '1400px !important', position: 'relative' }}>
        <Typography
          variant="h3"
          fontWeight={700}
          textAlign="center"
          sx={{ mb: 6, fontSize: { xs: '2rem', md: '2.8rem' }, color: '#222' }}
        >
          Why <span style={{ color: '#3b5bfd' }}>Ask Your Primary?</span>
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Box
                sx={{
                  bgcolor: '#22a6f5',
                  color: '#fff',
                  borderRadius: '28px',
                  p: { xs: 3, md: 4 },
                  minHeight: 320,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  boxShadow: 2,
                  fontSize: '1.1rem',
                }}
              >
                <Typography variant="h6" fontWeight={800} sx={{ mb: 2, fontSize: '1.25rem', color: '#fff' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" sx={{ color: '#fff', fontWeight: 400, fontSize: '1rem' }}>
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyAskBanner; 