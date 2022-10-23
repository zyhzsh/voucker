import React from 'react';
import { Voucher } from '../types/Voucher';

interface VoucherOverviewCardProps {
  voucher: Voucher;
}

const VoucherOverviewCard: React.FC<VoucherOverviewCardProps> = ({
  voucher,
}) => {
  return (
    <a
      href={`/voucher/${voucher.id}`}
      className="hover:shadow-lg w-54 self-center justify-self-center h-72 bg-slate-200 overflow-hidden p-2"
    >
      <img src={voucher.imageurl} alt="" className="w-full h-36 object-fill" />
      <div className="w-54  h-5 overflow-hidden">{voucher.name}</div>
      <div className="w-54  h-5 overflow-hidden">
        Price:{voucher.price} Euro
      </div>
      <div className="w-54  h-5 overflow-hidden">
        Inventory:{voucher.inventory}
      </div>
      <div className="w-54  h-5 overflow-hidden">Sold:{voucher.sold}</div>
      <div className="w-54 h-12  overflow-hidden">{voucher.description}</div>
    </a>
  );
};

export default VoucherOverviewCard;
