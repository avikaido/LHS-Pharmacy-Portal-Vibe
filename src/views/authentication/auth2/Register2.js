import React, { useState } from 'react';
import { Grid, Box, Card, Typography, Stack, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";

const Register2 = () => {
  const navigate = useNavigate();

  // Supertokens fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Additional fields for your users table
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  // Optionally, set a default role. You might allow user selection if desired.
  const [role, setRole] = useState('admin');

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First, sign up with Supertokens.
      const response = await EmailPassword.signUp({
        formFields: [
          { id: "email", value: email },
          { id: "password", value: password },
        ],
      });
      if (response.status === "OK") {

        // Get the Supertokens user ID (UUID) from the response.
        const userId = response.user.id;

        // Now call your custom backend API to create a record in your app's users table.
        const apiResponse = await fetch('/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uuid: userId,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            role: role,
          }),
        });

        if (!apiResponse.ok) {
          const errorData = await apiResponse.json();
          setErrorMessage(errorData.message || "Failed to save user details.");
        } else {
          // On success, navigate to your protected dashboard.
          navigate('/dashboard');
        }

      } else if (response.status === "EMAIL_ALREADY_EXISTS_ERROR") {
        setErrorMessage("Email already exists. Please try logging in.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again later.");
      }
    } catch (err) {
      console.error("Sign up error:", err);
      setErrorMessage("Sign up failed. Please check your connection and try again.");
    }
  };

  return (
    <PageContainer title="Register" description="this is Register page">
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
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                {errorMessage && (
                  <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                    {errorMessage}
                  </Typography>
                )}
                <TextField
                  label="First Name"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <TextField
                  label="Last Name"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <TextField
                  label="Phone"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
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
                  Register
                </Button>
              </Box>
              <Stack direction="row" spacing={1} mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="400">
                  Already have an Account?
                </Typography>
                <Typography
                  component={Link}
                  to="/auth/login"
                  fontWeight="500"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                  }}
                >
                  Sign In
                </Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Register2;