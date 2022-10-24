import NavBar from '../app/components/NavBar';
import { GetServerSideProps } from 'next';
import { Location } from '../app/types/Location';
import { useState } from 'react';
import { Category } from '../app/types/Category';
import CategoryFilter from '../app/components/CategoryFilter';
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
      `http://localhost/api/voucher/published/?location=${location.name}&category=${selectedCategory.name}`
    );
    const data: Voucher[] = (await response?.json()) || [];
    setSelectedLocation(selectedLocation);
    setPublishedVouchers(data);
  };
  const onChangeCategory = async (category: Category) => {
    const response = await fetch(
      `http://localhost/api/voucher/published/?location=${selectedLocation.name}&category=${category.name}`
    );
    const data: Voucher[] = (await response?.json()) || [];
    setPublishedVouchers(data);
    setSelectedCategory(category);
  };

  const SearchVouchers = async (userInput: string) => {
    const response = await fetch(
      `http://localhost/api/voucher/published/?location=${selectedLocation.name}&category=${selectedCategory.name}&search=${userInput}`
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
          onSelectedCategory={onChangeCategory}
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

export const getServerSideProps: GetServerSideProps = async () => {
  const locationRes = await fetch('http://localhost/api/location');
  const locations: Location[] = (await locationRes?.json()) || [];
  const categoryRes = await fetch('http://localhost/api/category');
  const categories: Category[] = (await categoryRes?.json()) || [];
  const voucherRes = await fetch(
    `http://localhost/api/voucher/published/?location=${locations[0].name}&category=${categories[0].name}`
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
