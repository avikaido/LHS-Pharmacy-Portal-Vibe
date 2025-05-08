import React, { useState } from 'react';
import { Grid, Box, Card, Typography, TextField, Button } from '@mui/material';
import Logo from 'src/layouts/full/shared/logo/Logo';
import PageContainer from 'src/components/container/PageContainer';
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";

const ForgotPassword2 = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await EmailPassword.sendResetPasswordEmail({
        formFields: [{ id: "email", value: email }],
      });
      if (response.status === "OK") {
        setMessage("If an account with that email exists, a reset link has been sent.");
        setErrorMessage("");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again later.");
        setMessage("");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setErrorMessage("Failed to send reset email. Please check your connection and try again.");
      setMessage("");
    }
  };

  return (
    <PageContainer title="Forgot Password" description="this is Forgot Password page">
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
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <Typography
                color="textSecondary"
                textAlign="center"
                variant="subtitle2"
                fontWeight="400"
                sx={{ mt: 2 }}
              >
                Please enter the email address associated with your account and we will email you a
                link to reset your password.
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                {message && (
                  <Typography color="primary" variant="body2" sx={{ mb: 2 }}>
                    {message}
                  </Typography>
                )}
                {errorMessage && (
                  <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                    {errorMessage}
                  </Typography>
                )}
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                  Reset Password
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default ForgotPassword2;
