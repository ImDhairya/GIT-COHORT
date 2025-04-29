import { Router } from "express";
import { validate } from "../middlewares/validator.middleware.js";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "../controllers/note.controllers.js";

const router = Router();

router.route("/getnotes").get(validate, getNotes);
router.route("/getnote/:id").get(validate, getNoteById);
router.route("/create").post(validate, createNote);
router.route("/update/:id").post(validate, updateNote);
router.route("/delete/:id").get(validate, deleteNote);

export default router;
