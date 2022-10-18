import React from 'react';
import Navbar from '../../components/Common/Navbar';

const VoucherDetail = (props: any) => {
  return (
    <>
      <Navbar />
    </>
  );
};

export default VoucherDetail;

export async function getServerSideProps() {
  return { props: { test: 'sssfsds' } };
}
