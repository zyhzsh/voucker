import React from 'react';
import Navbar from '../../components/Common/Navbar';

const VoucherDetail = (props: any) => {
  return (
    <>
      s
      <Navbar />
    </>
  );
};

export default VoucherDetail;
// This gets called on every request

export async function getServerSideProps() {
  return { props: { test: 'sssfsds' } };
}
