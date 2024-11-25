import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import RequestList from 'src/components/apps/request/Request-list/index';
import { RequestProvider } from 'src/context/RequestContext/index';
import BlankCard from 'src/components/shared/BlankCard';
import { CardContent } from '@mui/material';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Request List',
  },
];

const RequestListing = () => {
  return (
    <RequestProvider>
      <PageContainer title="Requests" description="Requests">
        <Breadcrumb title="Requests" subtitle="Your Requests" />
        <BlankCard>
          <CardContent>
            <RequestList />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </RequestProvider>
  );
};

export default RequestListing;