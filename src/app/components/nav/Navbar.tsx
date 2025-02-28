"use client";
import { Disclosure } from "@headlessui/react";
import { useSession } from "next-auth/react";
import MobileMenuButton from "./MobileMenuButton";
import Navigation from "./Navigation";
import ProfileDropdown from "./ProfileDropdown";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession(); // Get session data
  const router = useRouter();

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <MobileMenuButton />
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="../../assets/logo.jpg"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <Navigation />
            </div>
          </div>

          {/* If user is not signed in, show Sign In & Create Account buttons */}
          {!session ? (
            <div className="flex space-x-4">
              <button
                onClick={() => router.push("../api/auth/signin")}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push("../api/auth/signup")}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                Create Account
              </button>
            </div>
          ) : (
            // If user is signed in, show ProfileDropdown component
            <div className="flex space-x-4 items-center">
              <ProfileDropdown />
            </div>
          )}
        </div>
      </div>
    </Disclosure>
  );
}
