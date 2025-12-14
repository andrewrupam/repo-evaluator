export interface RepoData {
  owner: string;
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  openIssues: number;
  language: string | null;
  languages: Record<string, number>;
  createdAt: string;
  updatedAt: string;
  topics: string[];
  readme: string | null;
  fileCount: number;
  diskUsage: number; // in KB
  defaultBranch: string;
  hasWiki: boolean;
  hasPages: boolean;
  license: string | null;
  lastCommitDate: string | null;
  commitFrequency: number; // commits in last 30 days
  isFork: boolean;
  archived: boolean;
}

export interface AnalysisResult {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  roadmap: RoadmapStep[];
  breakdown: {
    codeQuality: number;
    structure: number;
    documentation: number;
    testing: number;
    maintainability: number;
  };
}

export interface RoadmapStep {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
}
