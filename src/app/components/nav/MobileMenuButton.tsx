import { DisclosureButton } from '@headlessui/react'
// import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'
// import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";


export default function MobileMenuButton() {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
      <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
        <span className="absolute -inset-0.5" />
        <span className="sr-only">Open main menu</span>
        <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
        <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
      </DisclosureButton>
    </div>
  )
}

