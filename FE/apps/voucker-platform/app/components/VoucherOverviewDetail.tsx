import React from 'react';
import { Voucher } from '../types/Voucher';
import Divided from './common/Divided';

interface VoucherOverviewDetailProps {
  voucher: Voucher;
}

const VoucherOverviewDetail: React.FC<VoucherOverviewDetailProps> = ({
  voucher,
}) => {
  return (
    <div className="px-10 pt-4 flex flex-col gap-4">
      <div className="flex flex-wrap justify-center gap-4 md:justify-center md:gap-10">
        {/* Image */}
        <div className="">
          <img
            src={`${voucher.imageurl}`}
            alt="voucher intro image"
            className="w-80 h-80"
          />
        </div>
        {/* Voucher detail */}
        <div className="px-4 w-96">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {voucher.name}
          </h1>
          <div className="mt-3 bg-teal-600 text-center rounded-md">
            <p className="text-4xl font-mono tracking-tight text-gray-900">
              {voucher.price} Euro
            </p>
          </div>
          <div className="mt-3 bg-blue-400 text-center rounded-md">
            <p className="text-4xl font-mono tracking-tight text-gray-900">
              Sold: {voucher.sold}
            </p>
          </div>
          <div className="mt-3 bg-gray-400 text-center rounded-md">
            <p className="text-4xl font-mono tracking-tight text-gray-900">
              Inventory:{voucher.inventory}
            </p>
          </div>
          <div className="mt-3 text-center rounded-md">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Description
            </h1>
            <div
              className="space-y-6 text-base text-gray-500"
              dangerouslySetInnerHTML={{ __html: voucher.description }}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Divided />
      </div>
    </div>
  );
};

export default VoucherOverviewDetail;
