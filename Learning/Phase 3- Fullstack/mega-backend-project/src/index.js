import app from "./app.js";
import dotenv from "dotenv";
import db from "./db/dbConnect.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 4000;


// await db()
// app.listen(PORT, () => {
//   console.log(`Listening to port ${PORT}`)
// })

db()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err, "Error connecting ");
    process.exit(1);
  });
