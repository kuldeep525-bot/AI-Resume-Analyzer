import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    originalFileName: {
      type: String,
    },
  },
  { timestamps: true },
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
