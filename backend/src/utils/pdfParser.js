// // // // import pdf from "pdf-parse";
// // // import * as pdf from "pdf-parse";

// // // const pdfParser = async (buffer) => {
// // //   try {
// // //     const data = await pdf.default(buffer);
// // //     return data.text;
// // //   } catch (error) {
// // //     console.error("PDF Parse Error:", error);
// // //     throw error;
// // //   }
// // // };

// // // export default pdfParser;

// // import { createRequire } from "module";
// // const require = createRequire(import.meta.url);
// // const pdf = require("pdf-parse");
// // // const pdf = pdfLib.default || pdfLib;

// // console.log("pdf type:", typeof pdf);
// // console.log("pdf value:", pdf);

// // const pdfParser = async (buffer) => {
// //   try {
// //     const data = await pdf(buffer);
// //     return data.text;
// //   } catch (error) {
// //     console.error("PDF Parse Error:", error);
// //     throw error;
// //   }
// // };

// // export default pdfParser;

// // pdfParser.js — same structure, library badli
// // import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
// import pdfjsLib from "pdfjs-dist";

// const pdfParser = async (buffer) => {
//   try {
//     const uint8Array = new Uint8Array(buffer);
//     const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;

//     let fullText = "";
//     for (let i = 1; i <= pdf.numPages; i++) {
//       const page = await pdf.getPage(i);
//       const content = await page.getTextContent();
//       const text = content.items.map((item) => item.str).join(" ");
//       fullText += text + "\n";
//     }

//     console.log(fullText);

//     return fullText;
//   } catch (error) {
//     console.error("PDF Parse Error:", error);
//     throw error;
//   }
// };

// export default pdfParser;

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const pdfParser = async (buffer) => {
  try {
    const uint8Array = new Uint8Array(buffer);
    const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;

    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const text = content.items.map((item) => item.str).join(" ");
      fullText += text + "\n";
    }

    return fullText;
  } catch (error) {
    console.error("PDF Parse Error:", error);
    throw error;
  }
};

export default pdfParser;
