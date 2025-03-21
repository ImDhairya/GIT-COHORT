import express from "express";
import {signInController} from "../routes/auth.user.routes.js";

const route = express.Router();

route.get("/signin", signInController);

export default route;
