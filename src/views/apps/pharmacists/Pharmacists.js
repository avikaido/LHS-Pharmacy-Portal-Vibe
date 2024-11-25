import React, { useState } from 'react';
import { Button, Box, Drawer, useMediaQuery } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PharmacistDetails from 'src/components/apps/pharmacists/PharmacistDetails';
import PharmacistList from 'src/components/apps/pharmacists/PharmacistList';
import PharmacistSearch from 'src/components/apps/pharmacists/PharmacistSearch';
import PharmacistFilter from 'src/components/apps/pharmacists/PharmacistFilter';
import AppCard from 'src/components/shared/AppCard';

const drawerWidth = 240;
const secdrawerWidth = 320;

const Pharmacists = () => {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    <PageContainer title="Pharmacists" description="Pharmacists List Page">
      <Breadcrumb title="Pharmacists" subtitle="Your Pharmacists" />
      <AppCard>
        {/* ------------------------------------------- */}
        {/* Left Part */}
        {/* ------------------------------------------- */}

        <Drawer
          open={isLeftSidebarOpen}
          onClose={() => setLeftSidebarOpen(false)}
          sx={{
            width: drawerWidth,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, position: 'relative', zIndex: 2 },
            flexShrink: 0,
          }}
          variant={lgUp ? 'permanent' : 'temporary'}
        >
          <PharmacistFilter />
        </Drawer>
        {/* ------------------------------------------- */}
        {/* Middle part */}
        {/* ------------------------------------------- */}
        <Box
          sx={{
            minWidth: secdrawerWidth,
            width: { xs: '100%', md: secdrawerWidth, lg: secdrawerWidth },
            flexShrink: 0,
          }}
        >
          <PharmacistSearch onClick={() => setLeftSidebarOpen(true)} />
          <PharmacistList showrightSidebar={() => setRightSidebarOpen(true)} />
        </Box>
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="right"
          open={isRightSidebarOpen}
          onClose={() => setRightSidebarOpen(false)}
          variant={mdUp ? 'permanent' : 'temporary'}
          sx={{
            width: mdUp ? secdrawerWidth : '100%',
            zIndex: lgUp ? 0 : 1,
            flex: mdUp ? 'auto' : '',
            [`& .MuiDrawer-paper`]: { width: '100%', position: 'relative' },
          }}
        >
          {/* back btn Part */}
          {mdUp ? (
            ''
          ) : (
            <Box sx={{ p: 3 }}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => setRightSidebarOpen(false)}
                sx={{ mb: 3, display: { xs: 'block', md: 'none', lg: 'none' } }}
              >
                Back{' '}
              </Button>
            </Box>
          )}
          <PharmacistDetails />
        </Drawer>
      </AppCard>
    </PageContainer>
  );
};

export default Pharmacists;
