import express from "express";
import {
  login,
  logout,
  registerUser,
  verifyUser,
} from "../controller/user.controller.js";

const router = express.Router();

router.get("/register", registerUser);
router.get("/verify/:token", verifyUser);
router.post("/login", login);
router.post("/logout", logout);

export default router;
