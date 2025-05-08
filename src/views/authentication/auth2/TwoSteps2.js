import React, { useState } from 'react';
import { Grid, Box, Card, Typography, TextField, Button } from '@mui/material';
import Logo from 'src/layouts/full/shared/logo/Logo';
import PageContainer from 'src/components/container/PageContainer';

const TwoSteps2 = () => {
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    // Placeholder for 2FA verification logic.
    // Here you would call your backend API (or use your chosen 2FA provider)
    // to verify the provided code.
    try {
      // For demonstration, we assume "123456" is the valid code.
      if (code === "123456") {
        setMessage("Two-factor authentication successful!");
        setErrorMessage("");
        // TODO: Redirect to the protected route or update your app state as needed.
      } else {
        setErrorMessage("Invalid verification code. Please try again.");
        setMessage("");
      }
    } catch (err) {
      console.error("Two-factor authentication error:", err);
      setErrorMessage("Verification failed. Please try again later.");
      setMessage("");
    }
  };

  return (
    <PageContainer title="Two-Factor Authentication" description="Enter the verification code">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={5}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, m: 3, zIndex: 1, width: '100%', maxWidth: '450px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                We sent a verification code to your mobile. Enter the code from your mobile in the field below.
              </Typography>
              <Typography variant="subtitle1" textAlign="center" fontWeight="700" mb={1}>
                ******1234
              </Typography>
              <Box component="form" onSubmit={handleVerify} sx={{ mt: 3 }}>
                {errorMessage && (
                  <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                    {errorMessage}
                  </Typography>
                )}
                {message && (
                  <Typography color="primary" variant="body2" sx={{ mb: 2 }}>
                    {message}
                  </Typography>
                )}
                <TextField
                  label="Verification Code"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                  Verify Code
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default TwoSteps2;