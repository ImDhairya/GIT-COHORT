import express, { urlencoded } from "express";
import healthCheckRouter from "./routes/healthcheck.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET || "defaultSecret"));
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRoutes);

export default app;
