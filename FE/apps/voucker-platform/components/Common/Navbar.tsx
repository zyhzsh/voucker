import React from 'react';
import SearchInput from './SearchInput';
import Logo from './Logo';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import axios from 'axios';

const Cities = [
  { id: 1, name: 'Tilburg' },
  { id: 2, name: 'Eindhoven' },
  { id: 3, name: 'Rotterdam' },
  { id: 4, name: 'Eden' },
];
const Categories = [
  { id: 1, name: 'Wellness' },
  { id: 2, name: 'Workshop' },
  { id: 3, name: 'Activity' },
];

const Navbar = ({ link }: any) => {
  const { user, error, isLoading } = useUser();
  console.log(link);
  return (
    <>
      <div className="navbar bg-base-100 h-24">
        <div className="flex-1">
          <Link href="/">
            <a className=" flex content-center btn btn-ghost normal-case text-xl">
              <Logo />
            </a>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            {/* Cities */}
            <li>
              <a>
                {/* {selectedCity} */}
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100">
                {Cities.map((city) => (
                  <li key={city.id}>
                    <a
                    // onClick={() => {
                    //   dispatch(switchCity(city.name));
                    // }}
                    >
                      {city.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            {/* Categories */}
            <li>
              <a>
                {/* {selectedCategory} */}
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100">
                {Categories.map((category) => (
                  <li key={category.id}>
                    <a
                    // onClick={() => {
                    //   dispatch(switchCategory(category.name));
                    // }}
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <SearchInput />
            {isLoading && <>Loading...</>}
            {error && <>{error.message}</>}
            {!user && (
              <li>
                <a href="/api/auth/login">Login</a>
              </li>
            )}
            {/* Avatar */}
            {user && (
              <li>
                <div className="avatar w-32 flex justify-center">
                  <div className="bg-neutral-focus text-neutral-content rounded-full h-8 text-center">
                    {/* User name */}
                    <span className="text-3xl">{user.name}</span>
                  </div>
                </div>
                <ul className="p-2 bg-base-100">
                  <li>
                    <a>Order</a>
                  </li>
                  <li>
                    <a>Voucher</a>
                  </li>
                  <li>
                    <Link href="/storemanagement/asjdhsadhais">
                      <a>Store</a>
                    </Link>
                  </li>
                  <li>
                    <a href="/api/auth/logout">Logout</a>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="divider mx-4" />
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  // const getLocations = await axios.get(
  //   `${process.env.BACKEND_END_POINT}/api/location`
  // );
  //console.log(`${process.env.BACKEND_END_POINT}/api/location`);

  // return 'link';
  // const getCategorys = await axios.get(
  //   `${process.env.BACKEND_END_POINT}/api/location`
  // );

  // console.log('datafetched:', getLocations);
  // // const res = await fetch(`https://.../data`)
  // // const data = await res.json()

  // // Pass data to the page via props
  // return { props: { data: getLocations } };

  return {
    props: { link: 'ddddddd' }, // will be passed to the page component as props
  };
}

export default Navbar;
