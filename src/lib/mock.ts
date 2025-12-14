import { AnalysisResult } from "./types";

export function getMockAnalysis(): AnalysisResult {
    return {
        score: 85,
        summary: "This repository demonstrates a solid understanding of modern web development practices. The code is clean, well-structured, and uses a consistent style. However, documentation could be improved, and test coverage is minimal. Overall, it's a strong project that shows great potential.",
        strengths: [
            "Clean and modular code structure",
            "Consistent use of TypeScript types",
            "Modern tech stack (Next.js, Tailwind)",
            "Good use of React hooks and components"
        ],
        weaknesses: [
            "Lack of comprehensive unit tests",
            "README is brief and missing setup details",
            "No CI/CD pipeline configuration",
            "Some hardcoded values in components"
        ],
        breakdown: {
            codeQuality: 90,
            structure: 85,
            documentation: 60,
            testing: 40,
            maintainability: 75
        },
        roadmap: [
            {
                title: "Add Unit Tests",
                description: "Implement unit tests for utility functions and core components using Jest or Vitest.",
                priority: "High"
            },
            {
                title: "Improve Documentation",
                description: "Expand the README to include installation steps, environment setup, and usage examples.",
                priority: "High"
            },
            {
                title: "Setup CI/CD",
                description: "Configure GitHub Actions to run linting and type checking on every pull request.",
                priority: "Medium"
            },
            {
                title: "Refactor Hardcoded Values",
                description: "Move configuration values and constants to a separate config file or environment variables.",
                priority: "Low"
            }
        ]
    };
}
