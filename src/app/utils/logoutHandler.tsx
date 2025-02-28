import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const handleLogout = async (router, setIsLoading, setShowSuccessToast) => {
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
