import React from 'react';
import Divided from './common/Divided';
import Logo from './common/Logo';
import { Location } from '../types/Location';
import ComboBox from './common/ComboBox';
import { useUser } from '@auth0/nextjs-auth0';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/solid';

interface Props {
  locations: Location[];
  onSelectLocation: (location: Location) => void;
  defaultLocation: Location;
}

const NavBar: React.FC<Props> = ({
  locations,
  onSelectLocation,
  defaultLocation,
}) => {
  const { user } = useUser();
  return (
    <div className="flex justify-center flex-col items-center">
      <nav className=" w-11/12 flex justify-between items-center p-8 pb-0">
        {/* Logo */}
        <a href="/" className="hover:text-teal-600 font-mono">
          <Logo />
        </a>
        {/* SubNav */}
        <div className="flex justify-center items-center gap-5">
          {/* Locations */}
          <ComboBox
            options={locations}
            defaultOption={defaultLocation}
            onSelect={onSelectLocation}
          />
          {/* Login */}
          {user && <UserProfileDropdown />}
          {!user && (
            <a href="/api/auth/login" className="hover:text-teal-600 font-mono">
              Login
            </a>
          )}
        </div>
      </nav>
      <Divided />
    </div>
  );
};
export default NavBar;

// UserProfileDropdown

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
const NavOptions = [
  { link: '#', name: 'Your order' },
  { link: '#', name: 'Your voucher' },
  { link: '/api/auth/logout', name: 'logout' },
];
const UserProfileDropdown = () => {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2">
          <UserCircleIcon className="w-8" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {NavOptions.map((option, _) => {
            return (
              <Menu.Item key={_}>
                {({ active }) => (
                  <a
                    href={option.link}
                    className={classNames(
                      active ? 'bg-teal-500' : '',
                      'block px-4 py-2 text-sm text-gray-700'
                    )}
                  >
                    {option.name}
                  </a>
                )}
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
