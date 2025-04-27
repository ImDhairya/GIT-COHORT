import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-errors.js";

export const isAuthenticated = async (req, res, next) => {
  const cookie = req.signedCookies.mycookies;

  if (!cookie) {
    return res.status(401).json({
      success: false,
      message: "No authentication token provided",
    });
  }
  
  try {
    const decode = jwt.verify(cookie, process.env.REFRESHTOKEN_SECRET);
    if (decode) {
      req.user = decode;
      next();
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
