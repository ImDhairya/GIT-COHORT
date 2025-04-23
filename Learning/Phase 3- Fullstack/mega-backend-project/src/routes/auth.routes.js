import { Router } from "express";
import {
  loginUser,
  registerUser,
  verifyEmail,
} from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validators/index.js";

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, loginUser);
router.route("/verifyemail").get(validate, verifyEmail);

export default router;
