import "./config/DataBase.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";

const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use(UserRoute);

app.listen(
  process.env.PORT,
  console.log("Server running on port " + process.env.PORT)
);
