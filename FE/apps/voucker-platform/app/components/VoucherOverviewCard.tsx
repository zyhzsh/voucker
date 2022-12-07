import Link from 'next/link';
import React from 'react';
import { Voucher } from '../types/Voucher';
import Divided from './common/Divided';

interface VoucherOverviewCardProps {
  voucher: Voucher;
}

const VoucherOverviewCard: React.FC<VoucherOverviewCardProps> = ({
  voucher,
}) => {
  return (
    <a
      href={`/voucher/${voucher.id}`}
      className="font-mono flex flex-col shadow-md hover:shadow-xl w-54 self-center justify-self-center h-72 bg-gray-100 rounded-md overflow-hidden p-2"
    >
      <img
        src={voucher.imageurl}
        alt="voucher image"
        className="w-full h-36 object-fill rounded-md"
      />
      <div className="w-54 h-5  overflow-hidden text-center font-bold">
        {voucher.name}
      </div>
      <div className="flex justify-center pt-1">
        <Divided />
      </div>
      <p className="pl-2 w-54 h-5 overflow-hidden  ">{voucher.price} Euro</p>
      <div className="pl-2 w-54 h-5 overflow-hidden ">
        {voucher.inventory} Left
      </div>
      <div className=" pl-2 w-54 h-5 overflow-hidden ">Sold:{voucher.sold}</div>
      <div className="flex justify-center pt-1">
        <Divided />
      </div>
      <div className="pl-2 w-54 h-12  overflow-hidden text-xs">
        {voucher.description}
      </div>
    </a>
  );
};

export default VoucherOverviewCard;
