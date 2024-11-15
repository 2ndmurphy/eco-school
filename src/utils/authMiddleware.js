import { verifyToken } from "./auth";
import { cookies } from "next/headers";

export const authMiddleware = async (req) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.log("No token found in cookies");
    return null;
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    console.log("Invalid or expired token");
    return null;
  }

  return decoded; // Return user object
};
