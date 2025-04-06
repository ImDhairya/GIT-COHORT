import express from "express";

const app = express();

app.use("/api/v1/healthcheck", healthCheckRouter);

export default app;
