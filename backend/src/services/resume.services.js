import pdfParser from "../utils/pdfParser.js";

export const parseResume = async (file) => {
  try {
    const rawText = await pdfParser(file.buffer);

    const cleanText = rawText.replace(/\s+/g, " ").trim();
    return cleanText;
  } catch (error) {
    console.error("Service Error:", error);
    throw error;
  }
};
