import express, {urlencoded} from "express";
import dotnev from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import Database from "./utils/db.js"; // we might get an erro when we don't write .js in some cases

const app = express();
dotnev.config();

const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("HFDS");
});

Database(); // connect to db

app.use("/api/v1/users/", userRoutes);

app.listen(port, () => {
  console.log("The server is listening on port ", port);
});
