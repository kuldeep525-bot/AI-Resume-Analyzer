import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import dbConnect from "./src/utils/db.js";

import resumeRoute from "./src/routes/resume.routes.js";
import UserRoute from "./src/routes/user.routes.js";

const app = express();
const port = process.env.PORT || 7000;

// Global Middleware
app.use(express.json());
app.use(cookieParser());

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Routes
app.use("/api/user", UserRoute);
app.use("/api/resume", resumeRoute);

// Server Start Function
const serverStart = async () => {
  try {
    await dbConnect();

    app.listen(port, () => {
      console.log(`Server started at port: ${port}`);
    });
  } catch (error) {
    console.error("Server crash:", error);
    process.exit(1); 
  }
};

serverStart();
