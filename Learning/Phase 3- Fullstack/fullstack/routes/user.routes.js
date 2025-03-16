import express from "express";
import {
  forgotPassword,
  getMe,
  login,
  logout,
  registerUser,
  resetPassword,
  verifyUser,
} from "../controller/user.controller.js";
import {isLoggedIn} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/register", registerUser);
router.get("/verify/:token", isLoggedIn, verifyUser);
router.post("/login", login);
router.post("/me", isLoggedIn, getMe);
router.post("/logout", isLoggedIn, logout);
router.post("/forgotpassword", isLoggedIn, forgotPassword);
router.post("/resetPassword/:token", isLoggedIn, resetPassword);

export default router;
