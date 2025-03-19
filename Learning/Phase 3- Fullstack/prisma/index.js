import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routes/auth.routes.js";

const port = process.env.PORT || 3000;
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "test checked",
    success: true,
  });
});

app.use("/api/v1/user", userRouter);

app.listen(() => {
  console.log(`Listening on port ${port}`);
});
