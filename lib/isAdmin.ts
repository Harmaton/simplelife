
import { auth } from "@/firebase";
import { db } from "./db";

export const checkAdmin = async () => {
    const authuser = auth.currentUser;
    const userId = authuser?.uid;
  
    // If no user ID, return false
    if (!userId) {
      return false;
    }
  
    // Retrieve user data including admin status
    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        isadmin: true,
      },
    });
  
    // If user is an isadmin, return true
    return user?.isadmin === true;
  };

  // 🛡️
const ADMIN_IDS = ["user_2XQq1wHg01BIKuZojItKXOWJsb8", "user_2Xrp3S3Kh1pYkxNGtoIv43P8jIA", "user_2XVZEhpZCkYdHLAXQ1LElBuJgH2"];
export const isAdmin = (userId?: string | null) => {
  if (!userId) return false;
  const cleanedUserId = userId.trim(); // Remove any leading/trailing spaces
  return ADMIN_IDS.includes(cleanedUserId);
};
