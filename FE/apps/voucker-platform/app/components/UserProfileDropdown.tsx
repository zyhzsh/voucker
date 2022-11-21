import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { UserProfile } from '@auth0/nextjs-auth0';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const CustomerNavOptions = [
  { link: '#', name: 'Your order' },
  { link: '#', name: 'Your voucher' },
  { link: '/api/auth/logout', name: 'logout' },
];

const VendorNavOptions = [
  { link: '/store-management', name: 'Your store' },
  { link: '#', name: 'Your order' },
  { link: '#', name: 'Your voucher' },
  { link: '/api/auth/logout', name: 'logout' },
];

const toStringsArray = (value: any): string[] => {
  //check every element in array is string
  if (Array.isArray(value) && value.every((e) => typeof e === 'string')) {
    return value;
  }
  return [''];
};

const isVendor = (user: UserProfile) => {
  const userRole = user?.['voucker-platform/role'];
  let roleResult = toStringsArray(userRole);
  return roleResult.includes('Vendor');
};

const UserNavOptions = (user: UserProfile) => {
  if (isVendor(user)) return VendorNavOptions;
  return CustomerNavOptions;
};

interface UserProfileDropdownProps {
  user: UserProfile;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({ user }) => {
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
          {UserNavOptions(user).map((option, _) => {
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

export default UserProfileDropdown;
