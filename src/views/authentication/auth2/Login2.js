import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography, TextField, Button } from '@mui/material';

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";

const Login2 = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await EmailPassword.signIn({
        formFields: [
          { id: "email", value: email },
          { id: "password", value: password },
        ],
      });
      if (response.status === "OK") {
        // Successful login; redirect to your dashboard or protected route.
        navigate('/dashboard');
      } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
        setErrorMessage("Incorrect email or password. Please try again.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again later.");
      }
    } catch (err) {
      console.error("Sign in error:", err);
      setErrorMessage("Sign in failed. Please check your connection and try again.");
    }
  };

  return (
    <PageContainer title="Login" description="this is Login page">
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
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '450px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              {/* Login Form */}
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                  Sign In
                </Button>
              </Box>
              <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="500">
                  New to Modernize?
                </Typography>
                <Typography
                  component={Link}
                  to="/auth/register"
                  fontWeight="500"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                  }}
                >
                  Create an account
                </Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
