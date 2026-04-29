// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";
// dotenv.config();

// const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // console.log("API KEY =>", process.env.GEMINI_API_KEY);

// const model = genAi.getGenerativeModel({
//   model: "gemini-1.5-flash-latest",
// });

// export const analyzeResumeWithAi = async (resumeText) => {
//   try {
//     const promt = `You are an resume analyzer.
//     Analyze the following resume and return ONLY valid JSON.

//     Required JSON format:

// {
//   "score": number,
//   "skills": [],
//   "strengths": [],
//   "weaknesses": [],
//   "suggestions": []
// }
//   Resume Content:
// ${resumeText}
//     `;

//     const result = await model.generateContent(promt);

//     //ai response

//     const response = await result.response;

//     // TEXT RESPONSE
//     let text = response.text();

//     // CLEAN MARKDOWN JSON
//     text = text
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     // CONVERT STRING → JSON
//     const parsedData = JSON.parse(text);

//     console.log(parsedData);
//     return parsedData;
//   } catch (error) {
//     console.log("AI Service Error:", error);
//     if (error.status === 429 && retries > 0) {
//       console.log(`Rate limited, retrying in 15s... (${retries} left)`);
//       await new Promise((res) => setTimeout(res, 15000));
//       return analyzeResumeWithAi(resumeText, retries - 1);
//     }

//     throw error;
//   }
// };

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAi.getGenerativeModel({
  model: "gemini-2.0-flash",
});

export const analyzeResumeWithAi = async (resumeText) => {
  try {
    const prompt = `You are a resume analyzer.
    Analyze the following resume and return ONLY valid JSON.
    
    Required JSON format:
    {
      "score": number,
      "skills": [],
      "strengths": [],
      "weaknesses": [],
      "suggestions": []
    }
    
    Resume Content:
    ${resumeText}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedData = JSON.parse(text);
    return parsedData;
  } catch (error) {
    console.log("AI Service Error:", error);
    throw error;
  }
};
