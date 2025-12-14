import { NextRequest, NextResponse } from 'next/server';
import { fetchRepoData } from '@/lib/github';
import { analyzeRepo } from '@/lib/gemini';

export async function POST(req: NextRequest) {
    try {
        const { repoUrl } = await req.json();

        if (!repoUrl) {
            return NextResponse.json({ error: 'Repository URL is required' }, { status: 400 });
        }

        // Extract owner and repo from URL
        // Supports formats: https://github.com/owner/repo, https://github.com/owner/repo.git, owner/repo
        let owner = '';
        let repo = '';

        try {
            if (repoUrl.startsWith('http')) {
                const url = new URL(repoUrl);
                const pathParts = url.pathname.split('/').filter(Boolean);
                if (pathParts.length >= 2) {
                    owner = pathParts[0];
                    repo = pathParts[1].replace('.git', '');
                }
            } else {
                const parts = repoUrl.split('/');
                if (parts.length === 2) {
                    owner = parts[0];
                    repo = parts[1];
                }
            }
        } catch (e) {
            return NextResponse.json({ error: 'Invalid repository URL format' }, { status: 400 });
        }

        if (!owner || !repo) {
            return NextResponse.json({ error: 'Could not parse owner and repository name' }, { status: 400 });
        }

        // Fetch data from GitHub
        const repoData = await fetchRepoData(owner, repo);

        if (!repoData) {
            return NextResponse.json({ error: 'Repository not found or private' }, { status: 404 });
        }

        // Analyze with Gemini
        const analysis = await analyzeRepo(repoData);

        if (!analysis) {
            return NextResponse.json({ error: 'Failed to generate analysis' }, { status: 500 });
        }

        return NextResponse.json({
            repoData,
            analysis,
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
