import React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Logo from '../../../../layouts/full/shared/logo/Logo';
import Navigations from './Navigations';

const HpHeader = ({ backgroundColor, loginButtonText }) => {
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    backgroundColor: backgroundColor || '#fff',
    boxShadow: 'none',
    minHeight: '70px',
    justifyContent: 'center',
  }));

  return (
    <AppBarStyled position="sticky" elevation={0}>
      <Container maxWidth={false} sx={{ maxWidth: '1400px !important', px: { xs: 2, sm: 4 } }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" minHeight="70px">
          {/* Logo on the left */}
          <Box display="flex" alignItems="center">
            <Logo />
          </Box>
          {/* Navigation in the center */}
          <Box flex={1} display="flex" justifyContent="center">
            <Stack direction="row" spacing={4} alignItems="center">
              <Navigations />
            </Stack>
          </Box>
          {/* CTA Button on the right */}
          <Box display="flex" alignItems="center">
            <Button
              color="primary"
              variant="contained"
              href="#"
              sx={{
                fontWeight: 700,
                fontSize: '1rem',
                px: 3,
                py: 1.5,
                borderRadius: '8px',
                boxShadow: '0px 2px 8px rgba(93, 135, 255, 0.15)',
                textTransform: 'none',
              }}
            >
              {loginButtonText || 'Get Started Now'}
            </Button>
          </Box>
        </Box>
      </Container>
    </AppBarStyled>
  );
};

export default HpHeader;
