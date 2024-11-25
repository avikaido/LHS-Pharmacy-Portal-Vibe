import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import CreateRequestApp from 'src/components/apps/request/Add-request';
import BlankCard from 'src/components/shared/BlankCard';
import { CardContent } from '@mui/material';
import { RequestProvider } from 'src/context/RequestContext';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Request Create',
  },
];

const CreateRequest = () => {
  return (
    <RequestProvider>
      <PageContainer title="Create Request" description="this is Create Request">
        <Breadcrumb title="Create Request" items={BCrumb} />

        <BlankCard>
          <CardContent>
            <CreateRequestApp />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </RequestProvider>
  );
};
export default CreateRequest;

