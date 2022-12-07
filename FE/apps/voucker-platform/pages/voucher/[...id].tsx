import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import CommentOverviewDetail from '../../app/components/CommentOverviewDetail';

import NavBar from '../../app/components/NavBar';
import StoreOverviewDetail from '../../app/components/StoreOverviewDetail';
import VoucherOverviewDetail from '../../app/components/VoucherOverviewDetail';
import { Store } from '../../app/types/Store';
import { Voucher } from '../../app/types/Voucher';

interface ProductDetailPageProps {
  voucher: Voucher;
  store: Store;
}

const VoucherDetail: NextPage<ProductDetailPageProps> = ({
  voucher,
  store,
}) => {
  const router = useRouter();
  return (
    <div>
      <NavBar />
      <button className="ml-20 mt-8 btn" onClick={() => router.back()}>
        Return
      </button>
      <VoucherOverviewDetail voucher={voucher} />
      <StoreOverviewDetail store={store} />
      <CommentOverviewDetail />
    </div>
  );
};
export default VoucherDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const voucherDetailRes = await fetch(
    `${process.env.BACKEND_URL}/voucher/detail/?id=${id}`
  );
  if (voucherDetailRes.status !== 200) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const voucher: Voucher = (await voucherDetailRes?.json()) || {};
  return {
    props: {
      voucher,
      store: voucher.store,
    },
  };
};
