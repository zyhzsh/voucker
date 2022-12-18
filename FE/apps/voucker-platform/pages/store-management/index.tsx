import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import requestHandler from '../../utls/requestHandler';

import React, { useState } from 'react';
import { StoreManagementFilter } from '../../app/components/common/TabsFilter';
import NavBar from '../../app/components/NavBar';
import { StoreManagementOption } from '../../app/types/StoreManagementOptions';
import { DataGrid, GridColDef, GridColumnApi } from '@mui/x-data-grid';
import { getUserId } from '../../utls/userProfile';
import { NextPage } from 'next';
import { Store } from '../../app/types/Store';
import { Voucher } from '../../app/types/Voucher';
import axios from 'axios';

const StoreManagementOptionTabs = [
  { id: 1, name: 'Stores' },
  { id: 2, name: 'Vouchers' },
];

interface StoreManagementPageProps {
  stores: Store[];
  vouchers: Voucher[];
}

const StoreManagementPage: NextPage<StoreManagementPageProps> = ({
  stores,
  vouchers,
}) => {
  const StoresColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Store ID',
      flex: 1,
      minWidth: 150,
      headerAlign: 'right',
      align: 'right',
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 150,
      headerAlign: 'right',
      align: 'right',
    },
    {
      field: 'phone',
      headerName: 'Contact',
      flex: 1,
      minWidth: 150,
      headerAlign: 'right',
      align: 'right',
    },
    {
      field: 'website',
      headerName: 'Website',
      flex: 1,
      minWidth: 150,
      headerAlign: 'right',
      align: 'right',
    },
    {
      field: 'location',
      headerName: 'Location',
      headerAlign: 'right',
      flex: 1,
      minWidth: 150,
      align: 'right',
    },
    {
      field: 'action',
      headerName: 'Action',
      headerAlign: 'right',
      align: 'right',
      flex: 1,
      minWidth: 150,
      renderCell: () => {
        return <div className="btn">Edit</div>;
      },
    },
  ];

  const VouchersColumns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 300,
      headerAlign: 'right',
      align: 'right',
    },
    {
      field: 'store',
      valueGetter: ({ row }) => {
        const voucher: Voucher = row;
        return voucher?.store?.name;
      },
      headerName: 'Store name',
      flex: 1,
      minWidth: 150,
      headerAlign: 'right',
      align: 'right',
    },
    {
      field: 'location',
      headerName: 'Location',
      flex: 1,
      minWidth: 150,
      headerAlign: 'right',
      align: 'right',
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      minWidth: 150,
      headerAlign: 'right',
      align: 'right',
    },
    {
      field: 'id',
      headerName: 'Voucher ID',
      flex: 1,
      minWidth: 150,
      headerAlign: 'right',
      align: 'right',
    },
    {
      field: 'inventory',
      headerName: 'Inventory',
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
    },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        const voucher: Voucher = row;
        const { status } = voucher;
        return (
          <div
            className={`border px-2 py-1 uppercase rounded-md ${
              status == 'published'
                ? 'bg-blue-400'
                : status == 'unpublished'
                ? 'bg-yellow-300'
                : status == 'soldout'
                ? 'bg-green-300'
                : ''
            }`}
          >
            {status}
          </div>
        );
      },
      flex: 1,
      minWidth: 150,
      headerAlign: 'right',
      align: 'right',
    },
    {
      field: 'action',
      headerName: 'Action',
      headerAlign: 'right',
      align: 'right',
      flex: 1,
      minWidth: 150,
      renderCell: ({ row }) => {
        const voucher: Voucher = row;
        const { status, id } = voucher;
        if (status == 'published' || status == 'soldout') {
          return <button className="btn-sm">Detail</button>;
        }
        return (
          <>
            <button className="btn-sm mr-2" onClick={() => PublishVoucher(id)}>
              Publish
            </button>
            <button className="btn-sm">Edit</button>
          </>
        );
      },
    },
  ];

  const [selectedTab, setSelected] = useState(StoreManagementOptionTabs[0]);
  const [data, setData] = useState<Store[] | Voucher[]>(stores);
  const [col, setCol] = useState(StoresColumns);

  // Get Columns Setting for DataGrid
  const GetColumns = (name: string): GridColDef[] => {
    switch (name) {
      case StoreManagementOptionTabs[0].name:
        return StoresColumns;
      case StoreManagementOptionTabs[1].name:
        return VouchersColumns;
      default:
        return StoresColumns;
    }
  };
  // Get Data Source for DataGrid
  const GetDataSource = (name: string): Store[] | Voucher[] => {
    switch (name) {
      case StoreManagementOptionTabs[0].name:
        return stores;
      case StoreManagementOptionTabs[1].name:
        return vouchers;
      default:
        return stores;
    }
  };

  const SwitchTabHandler = (tab: StoreManagementOption) => {
    setCol(GetColumns(tab.name));
    setData(GetDataSource(tab.name));
    setSelected(tab);
  };

  const PublishVoucher = async (id: number) => {
    // Publish voucher
    const res = await axios.patch(`api/management/publishvoucher/${id}`);
    const voucher = res.data;
    if (voucher) {
      setData([voucher, ...vouchers.filter((v) => v.id !== voucher.id)]);
    }
  };

  return (
    <>
      <NavBar />
      <StoreManagementFilter
        selectedOption={selectedTab}
        options={StoreManagementOptionTabs}
        onSelectOption={SwitchTabHandler}
      />
      <div className="h-[65vh] px-16 pt-5">
        <DataGrid rows={data} columns={col} />
      </div>
    </>
  );
};

export default StoreManagementPage;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    // Getting Access Token from Auth0
    const { accessToken } = await getAccessToken(context.req, context.res);
    console.log(accessToken);
    const vendor_id = getUserId(accessToken);
    // Get Vendor's Stores
    console.log(`----------------------------------------`);
    console.log(accessToken);
    let storesReq = await requestHandler
      .attchToken(accessToken)
      .get(`store/mystores/${vendor_id}`);
    const stores = storesReq.data;
    let vouchersReq = await requestHandler
      .attchToken(accessToken)
      .get(`store/myvouchers/${vendor_id}`);
    const vouchers = vouchersReq.data;
    return {
      props: {
        stores,
        vouchers,
      },
    };
  },
});
