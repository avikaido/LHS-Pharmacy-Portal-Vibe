import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import EditRequestPage from 'src/components/apps/request/Edit-request/index';
import { RequestProvider } from 'src/context/RequestContext/index';
import BlankCard from 'src/components/shared/BlankCard';
import { CardContent } from '@mui/material';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Request Edit',
  },
];

const RequestEdit = () => {
  return (
    <RequestProvider>
      <PageContainer title="Edit Request" description="this is Edit Request">
        <Breadcrumb title="Edit Request" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <EditRequestPage />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </RequestProvider>
  );
};

export default RequestEdit;