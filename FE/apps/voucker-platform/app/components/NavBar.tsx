import React from 'react';
import Divided from './common/Divided';
import Logo from './common/Logo';
import { Location } from '../types/Location';
import ComboBox from './common/ComboBox';
import { useUser } from '@auth0/nextjs-auth0';
import UserProfileDropdown from './UserProfileDropdown';

interface Props {
  locations?: Location[];
  onSelectLocation?: (location: Location) => void;
  defaultLocation?: Location;
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
          {locations && onSelectLocation && defaultLocation && (
            <ComboBox
              options={locations}
              defaultOption={defaultLocation}
              onSelect={onSelectLocation}
            />
          )}
          {/* Login */}
          {user && <UserProfileDropdown user={user} />}
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
