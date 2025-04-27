import express from "express";
import { validate } from "../middlewares/validator.middleware.js";
import {
  addMemberToProject,
  getProjectMembers,
} from "../controllers/project.controllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { addMemberToProjectValidator } from "../validators/index.js";

const router = express.Router();

router
  .route("/allmembers/:id")
  .get(validate, isAuthenticated, getProjectMembers);
router
  .route("/addmember/:id")
  .post(
    validate,
    addMemberToProjectValidator(),
    isAuthenticated,
    addMemberToProject,
  );

export default router;
