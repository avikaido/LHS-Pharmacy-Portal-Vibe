import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import ItemListing from '../../../components/apps/items/ItemListing';
import ItemFilter from '../../../components/apps/items/ItemFilter';
import ChildCard from 'src/components/shared/ChildCard';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Items',
  },
];

const ItemList = () => {
  return (
    <PageContainer title="Items" description="Items">
      <Breadcrumb title="Items" subtitle="Your Medicines and Devices" />
      <ChildCard>
        <ItemFilter />
        <ItemListing />
      </ChildCard>
    </PageContainer>
  );
};

export default ItemList;
