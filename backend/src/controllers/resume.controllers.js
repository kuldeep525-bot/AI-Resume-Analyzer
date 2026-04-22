import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Resume from "../models/resume.model.js";

export const uploadResume = async (req, res) => {
  try {
    // 1. File check
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload the resume file",
      });
    }

    // 2. Upload to Cloudinary
    const uploadedFile = await uploadOnCloudinary(req.file.path);

    // 3. Check upload success
    if (!uploadedFile || !uploadedFile.secure_url) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload on Cloudinary",
      });
    }

    // 4. Save to DB
    const resume = await Resume.create({
      userId: req.user.userId,
      resumeUrl: uploadedFile.secure_url,
      publicId: uploadedFile.public_id,
      originalFileName: req.file.originalname,
    });

    return res.status(201).json({
      success: true,
      message: "Resume uploaded & saved successfully",
      data: resume,
    });
  } catch (error) {
    console.error("Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
