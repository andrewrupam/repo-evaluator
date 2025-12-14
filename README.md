# RepoEvaluator 🚀

An intelligent system that evaluates public GitHub repositories and generates a score, written summary, and personalized improvement roadmap using Google Gemini AI.

![RepoEvaluator Demo](https://repo-evaluator-andrew.vercel.app/)

## 🎯 Features

- **Instant Analysis**: Fetches real repository data via GitHub API.
- **AI-Powered Insights**: Uses Google Gemini to generate honest, recruiter-style feedback.
- **Smart Scoring**: Calculates a 0-100 score based on code quality, structure, documentation, and testing.
- **Actionable Roadmap**: Provides a step-by-step guide to improve the project.
- **Premium UI**: Dark mode, parallax effects, and smooth animations.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS, Framer Motion
- **AI**: Google Gemini API (`gemini-1.5-flash`)
- **Data**: GitHub REST API (`octokit`)
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A Google Gemini API Key
- (Optional) A GitHub Personal Access Token

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/repo-evaluator.git
    cd repo-evaluator
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    - Copy `.env.example` to `.env.local`:
      ```bash
      cp .env.example .env.local
      ```
    - Add your API keys to `.env.local`.

4.  Run the development server:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Security

- **API Keys**: Stored in environment variables (`.env.local`). Never exposed to the client.
- **Server-Side Analysis**: All AI interactions happen on the server via Next.js Server Components.
- **Input Validation**: Repository URLs are validated before processing.

## 🧱 Architecture

1.  **User Input**: User submits a GitHub URL on the landing page.
2.  **Data Fetching**: Server Component fetches repository metadata (structure, languages, README) using `octokit`.
3.  **AI Analysis**: Structured data is sent to Gemini API with a specialized prompt.
4.  **Rendering**: Results are streamed to the client with a premium UI.

## 🧪 Demo Mode

If no API key is provided, the system falls back to a "Mock Mode" for demonstration purposes, showing example data.

## 📄 License

MIT
