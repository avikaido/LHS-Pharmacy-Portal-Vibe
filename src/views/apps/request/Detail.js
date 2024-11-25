import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import { RequestProvider } from 'src/context/RequestContext/index';
import RequestDetail from 'src/components/apps/request/Request-detail/index';
import BlankCard from 'src/components/shared/BlankCard';
import { CardContent } from '@mui/material';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Request Details',
  },
];

const RequestDetailPage = () => {
  return (
    <RequestProvider>
      <PageContainer title="Request Detail" description="this is Request Detail">
        <Breadcrumb title="Request Detail" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <RequestDetail />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </RequestProvider>
  );
};
export default RequestDetailPage;