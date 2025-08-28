import express from "express";
import routes from "./routes.js";
import dotenv from "dotenv";
import { connectToDb } from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(routes);

app.listen(process.env.PORT, () => {
  connectToDb();
  console.log("Server running at http://localhost:8888/");
});
