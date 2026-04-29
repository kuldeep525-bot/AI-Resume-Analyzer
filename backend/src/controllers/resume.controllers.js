// import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import Resume from "../models/resume.model.js";
// import { parseResume } from "../services/resume.services.js";

// export const uploadResume = async (req, res) => {
//   try {
//     console.log("hello");
//     // 1. File check
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "Please upload the resume file",
//       });
//     }

//     // 2. Upload to Cloudinary
//     const uploadedFile = await uploadOnCloudinary(req.file.path);

//     // 3. Check upload success
//     if (!uploadedFile || !uploadedFile.secure_url) {
//       return res.status(500).json({
//         success: false,
//         message: "Failed to upload on Cloudinary",
//       });
//     }

//     const text = await parseResume(req.file);

//     // 4. Save to DB
//     const resume = await Resume.create({
//       userId: req.user.userId,
//       resumeUrl: uploadedFile.secure_url,
//       publicId: uploadedFile.public_id,
//       originalFileName: req.file.originalname,
//       extractedText: text,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Resume uploaded & saved successfully",
//       data: resume,
//     });
//   } catch (error) {
//     console.error("Upload Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Resume from "../models/resume.model.js";
import { parseResume } from "../services/resume.services.js";
import { analyzeResumeWithAi } from "../services/ai.service.js";
import fs from "fs";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload the resume file",
      });
    }
    //  PDF text nikalo (disk file ko buffer mein padho)
    const fileBuffer = fs.readFileSync(req.file.path);
    const text = await parseResume({ buffer: fileBuffer });

    //  Cloudinary upload (disk se — file.path use karo)
    const uploadedFile = await uploadOnCloudinary(req.file.path);

    //Ai Analysis

    const analysis = await analyzeResumeWithAi(text);

    if (!uploadedFile || !uploadedFile.secure_url) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload on Cloudinary",
      });
    }

    // 3. DB mein save karo
    const resume = await Resume.create({
      userId: req.user.userId,
      resumeUrl: uploadedFile.secure_url,
      publicId: uploadedFile.public_id,
      originalFileName: req.file.originalname,
      extractedText: text,

      //ai analysis
      score: analysis.score,
      skills: analysis.skills,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      suggestions: analysis.suggestions,
    });

    return res.status(201).json({
      success: true,
      message: "Resume uploaded and analyzed successfully",
      data: { resume, analysis },
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
