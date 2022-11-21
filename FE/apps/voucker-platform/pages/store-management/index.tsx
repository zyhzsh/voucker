import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import requestHandler from '../../utls/requestHandler';

import React, { useState } from 'react';
import { StoreManagementFilter } from '../../app/components/common/TabsFilter';
import NavBar from '../../app/components/NavBar';
import { StoreManagementOption } from '../../app/types/StoreManagementOptions';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { getUserId } from '../../utls/userProfile';
import { NextPage } from 'next';
import { Store } from '../../app/types/Store';
import { Voucher } from '../../app/types/Voucher';

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
  const [selectedTab, setSelected] = useState(StoreManagementOptionTabs[0]);

  const rows: GridRowsProp = stores;
  const columns: GridColDef[] = [
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

  const SwitchTabHandler = (tab: StoreManagementOption) => {
    setSelected(tab);
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
        <DataGrid rows={rows} columns={columns} />
      </div>
    </>
  );
};

export default StoreManagementPage;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    // Getting Access Token from Auth0
    const { accessToken } = await getAccessToken(context.req, context.res);
    const vendor_id = getUserId(accessToken);
    // Get Vendor's Stores
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
