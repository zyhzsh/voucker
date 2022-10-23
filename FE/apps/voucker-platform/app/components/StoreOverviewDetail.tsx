import React from 'react';
import { Store } from '../types/Store';

import { MapPinIcon, GlobeAltIcon, PhoneIcon } from '@heroicons/react/24/solid';

interface StoreOverviewDetailProps {
  store: Store;
}

const StoreOverviewDetail: React.FC<StoreOverviewDetailProps> = ({ store }) => {
  return (
    <div className="px-10 pt-4 flex flex-col gap-4">
      <h1 className="text-center text-4xl font-mono font-bold">
        Provider Information
      </h1>
      <div className="flex flex-wrap justify-center gap-4 md:justify-center md:gap-10">
        {/* Image */}
        <div className="">
          <img
            src={`${store.imageurl}`}
            alt="voucher intro image"
            className="w-80 h-80"
          />
        </div>
        {/* Store detail */}
        <div className="px-4 w-96">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {store.name}
          </h1>
          <div className="mt-3 bg-teal-600 text-center rounded-md hover:bg-teal-800 ">
            <p className="flex gap-1 justify-center py-2 text-2xl font-mono tracking-tight  text-white">
              <MapPinIcon className="w-8" /> {store.address}
            </p>
          </div>
          <div className="mt-3 bg-teal-600 text-center rounded-md hover:bg-teal-800 ">
            <p className=" flex gap-8 justify-center text-3xl font-mono tracking-tight  text-white">
              <GlobeAltIcon className="w-8" /> Website
            </p>
          </div>
          <div className="mt-3 bg-teal-600 text-center rounded-md hover:bg-teal-800 ">
            <p className=" flex gap-8 justify-center text-3xl font-mono tracking-tight  text-white">
              <PhoneIcon className="w-8" /> {store.phone}
            </p>
          </div>
          <div className="mt-3 text-center rounded-md">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Description
            </h1>
            <div
              className="space-y-6 text-base text-gray-500"
              dangerouslySetInnerHTML={{ __html: store.description }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreOverviewDetail;
