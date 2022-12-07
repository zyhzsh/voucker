import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import requestHandler from '../utls/requestHandler';
import React, { useEffect, useState } from 'react';
import NavBar from '../app/components/NavBar';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getUserId } from '../utls/userProfile';
import { NextPage } from 'next';
import { Voucher } from '../app/types/Voucher';
import { Order } from '../app/types/Order';
import NowDataBox from '../app/components/common/NowDataBox';
import { loadStripe } from '@stripe/stripe-js';
import Router, { useRouter } from 'next/router';
import axios from 'axios';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

interface OrdersPageProps {
  orders: Order[];
}

const OrdersPage: NextPage<OrdersPageProps> = ({ orders }) => {
  const route = useRouter();
  const { success, canceled } = route.query;

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    //const query = new URLSearchParams(window.location.search);
    console.log();
    if (success !== undefined || (canceled !== undefined) !== undefined) {
      if (success) {
        alert('Order placed! You will receive an email confirmation.');
      }
      if (canceled) {
        alert(
          'Order canceled -- continue to shop around and checkout when you’re ready.'
        );
      }
    }
  }, [success, canceled]);

  const OrderColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Order ID',
      flex: 1,
      minWidth: 150,
      headerAlign: 'right',
      align: 'right',
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 150,
      headerAlign: 'right',
      align: 'right',
      renderCell: ({ row }) => {
        const voucher: Voucher = row;
        const { status } = voucher;
        return (
          <div
            className={`border px-2 py-1  rounded-md ${
              status == 'created'
                ? 'bg-blue-400'
                : status == 'pennding'
                ? 'bg-yellow-300'
                : status == 'completed'
                ? 'bg-green-300'
                : status == 'cancelled'
                ? 'bg-red-400'
                : ''
            }`}
          >
            {status == 'created'
              ? 'Await for pay'
              : status == 'pennding'
              ? 'Pocessing'
              : status == 'completed'
              ? 'Completed'
              : status == 'cancelled'
              ? 'Order cancelled'
              : ''}
          </div>
        );
      },
    },
    {
      field: 'created_at',
      headerName: 'Date',
      flex: 1,
      minWidth: 150,
      headerAlign: 'right',
      align: 'right',
      valueGetter: ({ row }) => {
        const order: Order = row;
        return new Date(order.created_at);
      },
    },
    {
      field: 'voucher_name',
      headerName: 'Voucher',
      flex: 1,
      minWidth: 150,
      headerAlign: 'right',
      align: 'right',
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      minWidth: 150,
      headerAlign: 'right',
      align: 'right',
      valueGetter: ({ row }) => {
        const order: Order = row;
        return `€${order.price}`;
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      headerAlign: 'right',
      align: 'right',
      flex: 1,
      minWidth: 240,
      renderCell: ({ row }) => {
        const order: Order = row;
        const { status } = order;
        if (status == 'pennding') {
          return;
        }
        if (status == 'completed' || status == 'cancelled') {
          return (
            <button className="btn-sm " onClick={() => {}}>
              Detail
            </button>
          );
        }
        return (
          <>
            <button
              className="btn-sm mr-2"
              onClick={async () => {
                const result = await axios.post(
                  '/api/checkout_sessions',
                  order
                );
                if (result.status === 200) {
                  const url = result.data;
                  location.assign(url);
                } else {
                  alert(
                    'Payment processing failed, please check you order status or try again'
                  );
                }
              }}
            >
              Checkout
            </button>
            <button className="btn-cancel-sm" onClick={() => {}}>
              Cancel
            </button>
          </>
        );
      },
    },
  ];
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center">
        <div className="felx w-full px-20 py-2">
          <h1 className="text-2xl font-mono p-2 font-bold ">
            Manage your order
          </h1>
        </div>
      </div>
      <div className="h-[75vh] px-16 pt-5">
        <DataGrid
          rows={orders}
          columns={OrderColumns}
          hideFooter={true}
          components={{
            NoRowsOverlay: NowDataBox,
          }}
        />
      </div>
    </>
  );
};

export default OrdersPage;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    // Getting Access Token from Auth0
    const { accessToken } = await getAccessToken(context.req, context.res);
    const user_id = getUserId(accessToken);
    // Get Vendor's Stores
    let storesReq = await requestHandler
      .attchToken(accessToken)
      .get(`order/myorder/${user_id}`);
    const myOrders = storesReq.data;
    return {
      props: {
        orders: myOrders,
      },
    };
  },
});
