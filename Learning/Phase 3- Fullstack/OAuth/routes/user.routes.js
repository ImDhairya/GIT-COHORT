import express from "express";
import {
  getProfile,
  login,
  registerUser,
  verify,
} from "../controllers/user.controller.js";
import isLoggedIn from "../middleware/isLogged.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", verify);
router.post("/login", login);
router.get("/get-profile", isLoggedIn, getProfile);

export default router;
