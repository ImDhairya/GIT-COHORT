import { Router } from "express";
import { validate } from "../middlewares/validator.middleware.js";
import {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = Router();

router.route("/getprojects").get(validate, getProjects);
router.route("/id/:id").get(validate, isAuthenticated, getProjectById);
router.route("/create").post(validate, isAuthenticated, createProject);
router.route("/update").post(isAuthenticated, updateProject);
router.route("/delete/:id").get(isAuthenticated, deleteProject);
export default router;
