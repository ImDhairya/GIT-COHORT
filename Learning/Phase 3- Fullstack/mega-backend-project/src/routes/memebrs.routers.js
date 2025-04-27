import express from "express";
import { validate } from "../middlewares/validator.middleware.js";
import {
  addMemberToProject,
  deleteMember,
  getProjectMembers,
  updateMemberRole,
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

router.route("/removemember").post(validate, isAuthenticated, deleteMember);
router.route("/updaterole/:id").post(validate, isAuthenticated, updateMemberRole);

export default router;
