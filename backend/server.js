import dotenv from "dotenv";
dotenv.config();
import express from "express";

import resumeRoute from "./src/routes/resume.routes.js";
const app = express();

const port = process.env.PORT || 7000;

app.get("/", (req, res) => {
  res.send("server start");
});

//global middleware

app.use("/api/resume", resumeRoute);

app.listen(port, (req, res) => {
  console.log(`server start at port:${port}`);
});
