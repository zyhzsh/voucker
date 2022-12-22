import NavBar from '../app/components/NavBar';
import { GetServerSideProps, GetStaticProps } from 'next';
import { Location } from '../app/types/Location';
import { useState } from 'react';
import { Category } from '../app/types/Category';
import { CategoryFilter } from '../app/components/common/TabsFilter';
import Search from '../app/components/common/Search';
import { Voucher } from '../app/types/Voucher';
import VoucherList from '../app/components/VoucherList';
import Footer from '../app/components/common/Footer';

interface HomePageProps {
  locations: Location[];
  categories: Category[];
  vouchers: Voucher[];
}

const Home: React.FC<HomePageProps> = ({ locations, categories, vouchers }) => {
  // Locations
  const [alllocations, setAllLocations] = useState<Location[]>(locations);
  const [selectedLocation, setSelectedLocation] = useState<Location>(
    locations[0]
  );
  // Categories
  const [allCategories, setAllCategories] = useState<Category[]>(categories);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0]
  );
  // Vouchers
  const [publishedVouchers, setPublishedVouchers] =
    useState<Voucher[]>(vouchers);

  const onChangeLocation = async (location: Location) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/voucher/published/?location=${location?.name}&category=${selectedCategory?.name}`
    );
    const data: Voucher[] = (await response?.json()) || [];
    setSelectedLocation(location);
    setPublishedVouchers(data);
  };
  const onChangeCategory = async (category: Category) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/voucher/published/?location=${selectedLocation?.name}&category=${category?.name}`
    );
    const data: Voucher[] = (await response?.json()) || [];
    setPublishedVouchers(data);
    setSelectedCategory(category);
  };
  const SearchVouchers = async (userInput: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/voucher/published/?location=${selectedLocation?.name}&category=${selectedCategory?.name}&search=${userInput}`
    );
    const data: Voucher[] = (await response?.json()) || [];
    setPublishedVouchers(data);
  };

  return (
    <>
      <div className="mb-5 min-h-[80vh]">
        <NavBar
          onSelectLocation={onChangeLocation}
          locations={alllocations}
          defaultLocation={selectedLocation}
        />
        <CategoryFilter
          onSelectCategory={onChangeCategory}
          selectedCategory={selectedCategory}
          categories={allCategories}
        />
        <Search onSearch={SearchVouchers} />
        <VoucherList vouchers={publishedVouchers} />
      </div>
      <Footer />
    </>
  );
};
export default Home;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const locationRes = await fetch(`${process.env.BACKEND_URL}/location`);
  const locations: Location[] = (await locationRes?.json()) || [];
  const categoryRes = await fetch(`${process.env.BACKEND_URL}/category`);
  const categories: Category[] = (await categoryRes?.json()) || [];
  const voucherRes = await fetch(
    `${process.env.BACKEND_URL}/voucher/published/?location=${locations?.[0]?.name}&category=${categories?.[0]?.name}`
  );
  const vouchers: Voucher[] = (await voucherRes?.json()) || [];
  return {
    props: {
      locations,
      categories,
      vouchers,
    },
  };
};
// export const getServerSideProps: GetServerSideProps = async () => {
//   const locationRes = await fetch(`${process.env.BACKEND_URL}/location`);
//   const locations: Location[] = (await locationRes?.json()) || [];
//   const categoryRes = await fetch(`${process.env.BACKEND_URL}/category`);
//   const categories: Category[] = (await categoryRes?.json()) || [];
//   const voucherRes = await fetch(
//     `${process.env.BACKEND_URL}/voucher/published/?location=${locations[0].name}&category=${categories[0].name}`
//   );
//   const vouchers: Voucher[] = (await voucherRes?.json()) || [];
//   return {
//     props: {
//       locations,
//       categories,
//       vouchers,
//     },
//   };
// };
