# 🚀 AI Resume Analyzer

An **AI-powered Resume Analyzer** that evaluates resumes, provides ATS scores, suggests improvements, and compares resumes with job descriptions using LLMs.

---

## 📌 Features

### ✅ Basic Features

- 📄 Upload Resume (PDF/DOCX)
- 🤖 AI-based Resume Analysis
- 📊 Resume Score (out of 100)
- 💡 Suggestions for Improvement

### 🚀 Advanced Features

- 🧾 ATS Compatibility Score
- 🎯 Job Role-Based Analysis (e.g., Backend Developer)
- 🔍 Keyword Match Percentage (Resume vs Job Description)
- 📂 Section-wise Feedback (Summary, Skills, Projects, Experience)
- ⚠️ Missing Skills Detection

---

## 🛠️ Tech Stack

### Frontend

- React.js (optional) / HTML, CSS, JavaScript
- Tailwind CSS (for modern UI)

### Backend

- Node.js
- Express.js

### AI Integration

- Groq API (LLM-based analysis)

### Resume Parsing

- pdf-parse (for PDF)
- mammoth (for DOCX)

### Database (Optional)

- MongoDB

### Deployment

- Vercel (Frontend)
- Render (Backend)

---

## ⚙️ How It Works (Flow)

1. User uploads a resume
2. Backend receives the file
3. Resume is parsed into text
4. Text is sent to AI (LLM)
5. AI analyzes and returns:
   - Score
   - Suggestions
   - ATS feedback
   - Skill gaps

6. Backend formats the response
7. Frontend displays results

---

## 📁 Project Structure

```
backend/
 ├── controllers/
 ├── routes/
 ├── services/
 │    └── aiService.js
 ├── utils/
 │    └── parser.js
 ├── app.js

frontend/
 ├── components/
 ├── pages/
 ├── App.js
```

---

## 🔑 Key Functionalities

### 1. Resume Upload

- Accepts PDF/DOCX files
- Uses multer for handling file uploads

### 2. Resume Parsing

- Extracts text from uploaded files

### 3. AI Analysis

- Sends resume text to LLM
- Generates structured insights

### 4. Job Matching

- Compares resume with job description
- Calculates keyword match %

### 5. Feedback System

- Section-wise evaluation
- Improvement suggestions

---

## 📊 Sample Output

```json
{
  "score": 75,
  "atsScore": 68,
  "keywordMatch": 60,
  "missingSkills": ["Docker", "Redis"],
  "suggestions": ["Add more projects", "Improve summary"],
  "sections": {
    "summary": "weak",
    "skills": "average",
    "projects": "strong"
  }
}
```

---

## 💡 Future Improvements

- 🔐 User Authentication
- 📜 Resume History Tracking
- 🌐 Multi-language Support
- 📈 Resume Progress Tracking
- 🤖 Auto Resume Builder

---

## 🧠 Learning Outcomes

- Real-world AI integration with backend
- Working with LLM APIs
- File handling & parsing
- Building production-level APIs
- Creating intelligent systems

---

## 🧑‍💻 Author

Kuldeep Kumar
BCA Final Year Student

---

## ⭐ Project Goal

To build a **real-world AI application** that demonstrates:

- Backend expertise
- AI integration skills
- Problem-solving ability

---

## 🚀 Getting Started

```bash
# Clone repo
git clone <your-repo-link>

# Install dependencies
npm install

# Run server
npm start
```

---

## 📬 Contribution

Feel free to fork and improve the project!

---
