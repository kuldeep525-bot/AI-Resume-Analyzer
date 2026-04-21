import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const uploadResume = async (req, res) => {
  try {
    // 1. File check
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload the resume file",
      });
    }

    // 2. Local file path
    const resumeLocalPath = req.file.path;

    // 3. Upload to Cloudinary
    const uploadedFile = await uploadOnCloudinary(resumeLocalPath);

    // 4. Upload failed check
    if (!uploadedFile || !uploadedFile.url) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload on Cloudinary",
      });
    }

    // 5. Success response
    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      data: {
        url: uploadedFile.url,
        public_id: uploadedFile.public_id,
      },
    });
  } catch (error) {
    console.error("Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
