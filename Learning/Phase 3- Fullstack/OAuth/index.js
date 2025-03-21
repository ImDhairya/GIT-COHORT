import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/auth.user.routes.js";
const port = process.env.PORT || 3000;

dotenv.config();

const app = express();

app.use("/api/v1/user", userRouter);

app.listen(port, () => {
  console.log("Server running at port ", {port});
});
