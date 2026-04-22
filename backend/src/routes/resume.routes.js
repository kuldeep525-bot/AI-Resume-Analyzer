import { Router } from "express";
import { uploadResume } from "../controllers/resume.controllers.js";
import { upload } from "../middleware/muter.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const route = Router();

route.post("/upload", upload.single("resume"), authMiddleware, uploadResume);

export default route;
