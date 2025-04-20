import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use("/api/v1/healthcheck", healthCheckRouter);

export default app;
