import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";

import resumeRoute from "./src/routes/resume.routes.js";
import UserRoute from "./src/routes/user.routes.js";
const app = express();

const port = process.env.PORT || 7000;

//gloabl middleware

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("server start");
});

//global middleware
app.use("/api/user", UserRoute);
app.use("/api/resume", resumeRoute);

app.listen(port, (req, res) => {
  console.log(`server start at port:${port}`);
});
