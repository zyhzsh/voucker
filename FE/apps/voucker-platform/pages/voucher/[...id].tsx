import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CategoryFilter from '../../app/components/CategoryFilter';
import CommentOverviewDetail from '../../app/components/CommentOverviewDetail';

import NavBar from '../../app/components/NavBar';
import StoreOverviewDetail from '../../app/components/StoreOverviewDetail';
import VoucherOverviewDetail from '../../app/components/VoucherOverviewDetail';
import { Location } from '../../app/types/Location';
import { Store } from '../../app/types/Store';
import { Voucher } from '../../app/types/Voucher';

interface ProductDetailPageProps {
  locations: Location[];
  voucher: Voucher;
  store: Store;
}

const VoucherDetail = ({
  locations,
  voucher,
  store,
}: ProductDetailPageProps) => {
  // Locations
  const [alllocations, setAllLocations] = useState<Location[]>(locations);
  const [selectedLocation, setSelectedLocation] = useState<Location>(
    locations[0]
  );
  const router = useRouter();

  const onChangeLocation = () => {};

  return (
    <div>
      <NavBar
        onSelectLocation={onChangeLocation}
        locations={alllocations}
        defaultLocation={selectedLocation}
      />
      <button className="ml-20 mt-8 btn" onClick={() => router.back()}>
        Return
      </button>
      <VoucherOverviewDetail voucher={voucher} />
      <StoreOverviewDetail store={store} />
      <CommentOverviewDetail />
    </div>
  );
};
export default VoucherDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const locationRes = await fetch('http://localhost/api/location');
  const locations: Location[] = (await locationRes?.json()) || [];
  const voucherDetailRes = await fetch(
    `http://localhost/api/voucher/detail/?id=${id}`
  );
  const voucher: Voucher = (await voucherDetailRes?.json()) || {};
  return {
    props: {
      locations,
      voucher,
      store: voucher.store,
    },
  };
};
