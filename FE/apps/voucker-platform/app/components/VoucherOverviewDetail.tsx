import React from 'react';
import { Voucher } from '../types/Voucher';

interface VoucherOverviewDetailProps {
  voucher: Voucher;
}

const VoucherOverviewDetail: React.FC<VoucherOverviewDetailProps> = ({
  voucher,
}) => {
  return <div>{voucher.name}</div>;
};

export default VoucherOverviewDetail;
