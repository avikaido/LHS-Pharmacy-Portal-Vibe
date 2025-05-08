import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import FaxListing from '../../../components/apps/faxes/FaxListing';
import FaxFilter from '../../../components/apps/faxes/FaxFilter';
import ChildCard from 'src/components/shared/ChildCard';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Faxes',
  },
];

const FaxList = () => {
  return (
    <PageContainer title="Faxes" description="Faxes">
      <Breadcrumb title="Faxes" subtitle="Your Faxes" />
      <ChildCard>
        <FaxFilter />
        <FaxListing />
      </ChildCard>
    </PageContainer>
  );
};

export default FaxList;
