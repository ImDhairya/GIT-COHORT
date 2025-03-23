import express from "express";
import bcrypt from "bcryptjs";
import userRouter from "./routes/auth.user.routes.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PROT || 3000;

app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.listen(port, () => {
  console.log("Server running on port ", port);
});
