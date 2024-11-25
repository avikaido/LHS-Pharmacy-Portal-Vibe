import React, { useState } from 'react';
import { Button, Box, Drawer, useMediaQuery } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PharmacyDetails from 'src/components/apps/pharmacies/PharmacyDetails';
import PharmacyList from 'src/components/apps/pharmacies/PharmacyList';
import PharmacySearch from 'src/components/apps/pharmacies/PharmacySearch';
import PharmacyFilter from 'src/components/apps/pharmacies/PharmacyFilter';
import AppCard from 'src/components/shared/AppCard';

const drawerWidth = 240;
const secdrawerWidth = 320;

const Pharmacies = () => {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    <PageContainer title="Pharmacies" description="Pharmacies List Page">
      <Breadcrumb title="Pharmacies" subtitle="Your Pharmacies" />
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
          <PharmacyFilter />
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
          <PharmacySearch onClick={() => setLeftSidebarOpen(true)} />
          <PharmacyList showrightSidebar={() => setRightSidebarOpen(true)} />
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
          <PharmacyDetails />
        </Drawer>
      </AppCard>
    </PageContainer>
  );
};

export default Pharmacies;
