import React from 'react';
import { Store } from '../types/Store';

interface StoreOverviewDetailProps {
  store: Store;
}

const StoreOverviewDetail: React.FC<StoreOverviewDetailProps> = ({ store }) => {
  return <div>{store.name}</div>;
};

export default StoreOverviewDetail;
