import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  resendEmailVerification,
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
router.route("/verifyemail/:token").get(validate,verifyEmail);
router.route("/logout").get(logoutUser);
router.route("/resendverifyemail").post(validate, resendEmailVerification);



export default router;
