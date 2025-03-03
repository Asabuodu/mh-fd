import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";


export default function MobileMenuButton() {
  return (
    <Disclosure as="div" className="absolute inset-y-0 left-0 flex items-center sm:hidden">
      {({ open }) => (
        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset">
          <span className="absolute -inset-0.5" />
          <span className="sr-only">Open main menu</span>
          {open ? (
            <XMarkIcon aria-hidden="true" className="block size-6" />
          ) : (
            <Bars3Icon aria-hidden="true" className="block size-6" />
          )}
        </Disclosure.Button>
      )}
    </Disclosure>
  );
}
