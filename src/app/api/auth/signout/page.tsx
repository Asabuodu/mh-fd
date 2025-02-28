"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Signout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    console.log("Logout clicked"); // Debugging

    try {
      setIsLoading(true);
      
      await signOut({ redirect: false }); // Ensure logout happens
      console.log("User signed out successfully");

      setShowSuccessToast(true);

      setTimeout(() => {
        router.push("./signin"); // Redirect to signin page
      }, 2000);
    } catch (error) {
      console.error("SignOut Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        {isLoading ? "Logging out..." : "Sign Out"}
      </button>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-md shadow-lg">
          <p>Signed Out! Redirecting...</p>
        </div>
      )}
    </div>
  );
};

export default Signout;
