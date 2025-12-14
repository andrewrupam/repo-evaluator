"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ParticleBackground } from "@/components/landing/ParticleBackground";

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl) return;

    setIsLoading(true);
    // Extract owner and repo to validate format before navigating
    // Simple check, real validation happens on API/Report page
    try {
      // Navigate to report page
      // We'll pass the URL as a query param or encode it in the path
      // Path strategy: /report/owner/repo

      let owner = '';
      let repo = '';

      if (repoUrl.startsWith('http')) {
        const url = new URL(repoUrl);
        const parts = url.pathname.split('/').filter(Boolean);
        if (parts.length >= 2) {
          owner = parts[0];
          repo = parts[1].replace('.git', '');
        }
      } else {
        const parts = repoUrl.split('/');
        if (parts.length === 2) {
          owner = parts[0];
          repo = parts[1];
        }
      }

      if (owner && repo) {
        router.push(`/report/${owner}/${repo}`);
      } else {
        alert("Invalid GitHub URL format. Please use https://github.com/owner/repo");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("Invalid URL");
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 relative overflow-hidden">
      <ParticleBackground />

      {/* Author Name */}
      <div className="absolute top-6 left-6 z-20">
        <span className="text-white/80 font-medium tracking-wide text-sm md:text-base">
          Andrew Rupam
        </span>
      </div>

      <div className="z-10 w-full max-w-4xl text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80 backdrop-blur-sm">
            <Sparkles className="mr-2 h-4 w-4 text-yellow-400" />
            <span>AI-Powered Repository Analysis</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            Your GitHub Repo, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Evaluated by AI
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Get an instant, honest, recruiter-style evaluation of your project.
            Discover strengths, identify weaknesses, and get a personalized roadmap to improvement.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-xl"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
            <Input
              type="text"
              placeholder="https://github.com/username/repository"
              className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-purple-500"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="lg"
              className="h-12 bg-white text-black hover:bg-gray-200 font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Analyzing..." : "Analyze Repo"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              <span>Public Repos Only</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>Powered by Gemini</span>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
