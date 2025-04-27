import { Router } from "express";
import { validate } from "../middlewares/validator.middleware.js";
import {
  getProjects,
  createProject,
  getProjectById,
} from "../controllers/project.controllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = Router();

router.route("/getprojects").get(validate, getProjects);
router.route("/projectid/:id").get(validate, getProjectById);
router.route("/create").post( isAuthenticated, createProject);
export default router;
