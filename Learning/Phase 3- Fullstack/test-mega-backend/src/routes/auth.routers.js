import { Router } from "express";

import { registerUser } from "../middlewares/validator.middlewares.js";
import { userRegistrationValidator } from "../validators";

const router = Router();

router
  .route("/register")
  .post(userRegistrationValidator(), validate, registerUser);

export default router;
