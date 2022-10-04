// import React, { useEffect, useState } from 'react';
// import SearchInput from './SearchInput';
// import Logo from './Logo';
// import Link from 'next/link';
// import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   switchCity,
//   selectCity,
//   selectCategory,
//   switchCategory,
// } from '../../slices/customerUser/voucherSearchFilterSlice';
// const Cities = [
//   { id: 1, name: 'Tilburg' },
//   { id: 2, name: 'Eindhoven' },
//   { id: 3, name: 'Rotterdam' },
//   { id: 4, name: 'Eden' },
// ];
// const Categories = [
//   { id: 1, name: 'Wellness' },
//   { id: 2, name: 'Workshop' },
//   { id: 3, name: 'Activity' },
// ];

// const Navbar = () => {
//   const [loginStatus, SetLoginStatus] = useState(false);
//   const selectedCity = useSelector(selectCity);
//   const selectedCategory = useSelector(selectCategory);
//   const dispatch = useDispatch();

//   return (
//     <>
//       <div className="navbar bg-base-100 h-24">
//         <div className="flex-1">
//           <Link href="/">
//             <a className=" flex content-center btn btn-ghost normal-case text-xl">
//               <Logo />
//             </a>
//           </Link>
//         </div>
//         <div className="flex-none">
//           <ul className="menu menu-horizontal p-0">
//             {/* Cities */}
//             <li>
//               <a>
//                 {selectedCity}
//                 <svg
//                   className="fill-current"
//                   width="20"
//                   height="20"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
//                 </svg>
//               </a>
//               <ul className="p-2 bg-base-100">
//                 {Cities.map((city) => (
//                   <li key={city.id}>
//                     <a
//                       onClick={() => {
//                         dispatch(switchCity(city.name));
//                       }}
//                     >
//                       {city.name}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//             {/* Categories */}
//             <li>
//               <a>
//                 {selectedCategory}
//                 <svg
//                   className="fill-current"
//                   width="20"
//                   height="20"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
//                 </svg>
//               </a>
//               <ul className="p-2 bg-base-100">
//                 {Categories.map((category) => (
//                   <li key={category.id}>
//                     <a
//                       onClick={() => {
//                         dispatch(switchCategory(category.name));
//                       }}
//                     >
//                       {category.name}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//             <SearchInput />
//             {!loginStatus && (
//               <li>
//                 <button onClick={() => SetLoginStatus(true)}>Login</button>
//               </li>
//             )}
//             {/* Avatar */}
//             {loginStatus && (
//               <li>
//                 <div className="avatar w-32 flex justify-center">
//                   <div className="bg-neutral-focus text-neutral-content rounded-full h-8 text-center">
//                     {/* User name */}
//                     <span className="text-3xl">K</span>
//                   </div>
//                 </div>
//                 <ul className="p-2 bg-base-100">
//                   <li>
//                     <a>Order</a>
//                   </li>
//                   <li>
//                     <a>Voucher</a>
//                   </li>
//                   <li>
//                     <Link href="/storemanagement/asjdhsadhais">
//                       <a>Store</a>
//                     </Link>
//                   </li>
//                   <li>
//                     <a>Logout</a>
//                   </li>
//                 </ul>
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//       <div className="divider mx-4" />
//     </>
//   );
// };

// export default Navbar;

import React, { useEffect, useState } from 'react';
import SearchInput from './SearchInput';
import Logo from './Logo';
import Link from 'next/link';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useUser } from '@auth0/nextjs-auth0';
import {
  switchCity,
  selectCity,
  selectCategory,
  switchCategory,
} from '../../slices/customerUser/voucherSearchFilterSlice';
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

const Navbar = () => {
  const { user, error, isLoading } = useUser();

  const selectedCity = useSelector(selectCity);
  const selectedCategory = useSelector(selectCategory);
  const dispatch = useDispatch();

  console.log('all infor', user);

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
                {selectedCity}
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
                      onClick={() => {
                        dispatch(switchCity(city.name));
                      }}
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
                {selectedCategory}
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
                      onClick={() => {
                        dispatch(switchCategory(category.name));
                      }}
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

export default Navbar;
