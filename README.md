# RepoEvaluator 🚀

<p align="center">
  <img src="public/screenshots/homepage.png" alt="RepoEvaluator Home Page" width="100%" />
</p>

<p align="center">
An AI-powered system that evaluates public GitHub repositories and reflects their real-world quality through a score, honest summary, and personalized improvement roadmap.
</p>

<p align="center">
🔗 <a href="https://repo-evaluator-andrew.vercel.app">Live Demo</a>
</p>

---

## 🎯 What is RepoEvaluator?

RepoEvaluator acts as a **repository mirror** for developers.  
It analyzes real GitHub repository data and shows how a project would look to a recruiter or mentor — what’s strong, what’s weak, and what to improve next.

The system focuses on **practical code quality**, not theoretical metrics.

---

## ✨ Features

- **Real Repository Analysis**  
  Fetches live data using the GitHub API (structure, commits, README, tech stack).

- **AI-Powered Evaluation**  
  Uses Google Gemini to generate recruiter-style feedback.

- **Smart Scoring System**  
  Produces a 0–100 score based on structure, documentation, testing, and maintainability.

- **Personalized Roadmap**  
  Actionable steps tailored to the specific repository.

- **Premium UI Experience**  
  Dark theme, bold typography, smooth animations, and interactive parallax effects.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS, Framer Motion
- **AI**: Google Gemini API (`gemini-1.5-flash`)
- **Data**: GitHub REST API (Octokit)
- **Icons**: Lucide React
- **Deployment**: Vercel

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js 18+
- Google Gemini API Key
- (Optional but recommended) GitHub Personal Access Token

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/repo-evaluator.git
   cd repo-evaluator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Add your keys inside `.env`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   GITHUB_TOKEN=your_github_token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000)

---

## 🔐 Security & Best Practices

- **API keys** are stored only in environment variables.
- **No secrets** are committed to the repository.
- **All AI analysis** runs server-side.
- **The frontend** never directly accesses Gemini or GitHub APIs.
- **Repository URLs** are validated before analysis.

---

## 🧱 System Architecture

1. **User Input**: User submits a public GitHub repository URL.
2. **Data Fetching**: Server fetches repository metadata via GitHub API.
3. **AI Analysis**: Structured repo data is sent to Gemini with a specialized evaluation prompt.
4. **Output Rendering**: Score, summary, and roadmap are rendered with a responsive UI.

---

## 🧪 Demo / Fallback Mode

If API keys are not provided, the app automatically switches to **Mock Mode**, displaying example outputs for demonstration purposes.  
This ensures the project remains usable during demos and reviews.

---

## 🎓 Hackathon Relevance

This project prioritizes:
- **Accuracy** over assumptions
- **Honest feedback** over inflated scores
- **Actionable guidance** over generic advice

It evaluates real developer output, not theory.

---
💡 **Best Experience:** This project is designed for **dark mode**. For optimal visuals, please enable dark theme in your system or browser.

## 📄 License

MIT License
