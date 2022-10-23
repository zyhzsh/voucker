import React from 'react';
import { Voucher } from '../types/Voucher';
import Divided from './common/Divided';
import VoucherOverviewCard from './VoucherOverviewCard';

interface VoucherListProps {
  vouchers: Voucher[];
}

const VoucherList: React.FC<VoucherListProps> = ({ vouchers }) => {
  return (
    <div>
      <h1 className="ml-20 text-2xl font-mono p-2">Vouchers</h1>
      <div className=" grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 mt-1 gap-3 px-16 grid-cols-2 items-center">
        {vouchers.map((voucher) => {
          return <VoucherOverviewCard voucher={voucher} key={voucher.id} />;
        })}
      </div>
    </div>
  );
};

export default VoucherList;
