
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from "next/navigation";

function handleLogout(router: any, onSuccess: () => void, onError: () => void) {
  signOut({ callbackUrl: "../api/auth/signout" })
    .then(onSuccess)
    .catch(onError);
}

export default function ProfileDropdown() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  if (!session) return null; // Hide if not authenticated

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <button
        type="button"
        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">View notifications</span>
        <BellIcon aria-hidden="true" className="size-6" />
      </button>

      {/* Profile dropdown */}
      <Menu as="div" className="relative ml-3">
        <div>
          <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <img
              alt="Profile"
              src={session?.user?.image || "/assets/default-avatar.png"}
              className="size-8 rounded-full"
            />
          </MenuButton>
        </div>
        
        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-none"
        >
          <MenuItem>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Your Profile
            </a>
          </MenuItem>
          <MenuItem>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Settings
            </a>
          </MenuItem>
          <MenuItem>
            {/* <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false); // Hide dropdown immediately
                signOut({ callbackUrl: "../api/auth/signout" }); // Logout user
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </button> */}
             <button
      type="button"
      onClick={() => {
        setIsMenuOpen(false); // Hide dropdown immediately
        handleLogout(router, () => {}, () => {}); // Call logout function
      }}
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      Sign out
    </button>
            
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
