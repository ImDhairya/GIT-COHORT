import express, {application, urlencoded} from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(urlencoded({extended: true}));

app.use(
  cors({
    origin: [process.env.BASE_URL, "localhost:4000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/users", userRoutes);

connectDB();

app.listen(port, () => {
  console.log(`Server listening to ${port}`);
});
