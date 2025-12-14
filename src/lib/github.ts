import { Octokit } from 'octokit';
import { RepoData } from './types';

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

export async function fetchRepoData(owner: string, repo: string): Promise<RepoData | null> {
    try {
        const [repoResponse, languagesResponse, commitsResponse, readmeResponse] = await Promise.all([
            octokit.request('GET /repos/{owner}/{repo}', { owner, repo }),
            octokit.request('GET /repos/{owner}/{repo}/languages', { owner, repo }),
            octokit.request('GET /repos/{owner}/{repo}/commits', { owner, repo, per_page: 30 }),
            octokit.request('GET /repos/{owner}/{repo}/readme', { owner, repo }).catch(() => null),
        ]);

        const repoData = repoResponse.data;
        const languages = languagesResponse.data;
        const commits = commitsResponse.data;

        // Decode README content
        let readmeContent = null;
        if (readmeResponse && readmeResponse.data.content) {
            readmeContent = Buffer.from(readmeResponse.data.content, 'base64').toString('utf-8');
        }

        // Calculate commit frequency (simple approximation)
        const commitFrequency = Array.isArray(commits) ? commits.length : 0;
        const lastCommitDate = Array.isArray(commits) && commits.length > 0 ? commits[0].commit.author?.date || null : null;

        // Estimate file count (not directly available, using size as proxy or tree if needed, but size is easier for now)
        // For more accuracy we could fetch the tree, but for large repos that's heavy.
        // Let's stick to what's available or simple.
        // Actually, let's try to get a rough file count via the tree API for the root.
        // But recursive tree can be huge. Let's just use size for now or leave fileCount as a rough metric or fetch root tree.

        // Let's fetch the root tree to get a sense of structure
        let fileCount = 0;
        try {
            const treeResponse = await octokit.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1', {
                owner,
                repo,
                tree_sha: repoData.default_branch,
            });
            fileCount = treeResponse.data.tree.length;
        } catch (e) {
            console.warn('Failed to fetch tree for file count', e);
        }

        return {
            owner: repoData.owner.login,
            name: repoData.name,
            description: repoData.description,
            url: repoData.html_url,
            stars: repoData.stargazers_count,
            forks: repoData.forks_count,
            openIssues: repoData.open_issues_count,
            language: repoData.language,
            languages: languages,
            createdAt: repoData.created_at,
            updatedAt: repoData.updated_at,
            topics: repoData.topics || [],
            readme: readmeContent,
            fileCount: fileCount,
            diskUsage: repoData.size,
            defaultBranch: repoData.default_branch,
            hasWiki: repoData.has_wiki,
            hasPages: repoData.has_pages,
            license: repoData.license?.name || null,
            lastCommitDate: lastCommitDate,
            commitFrequency: commitFrequency,
            isFork: repoData.fork,
            archived: repoData.archived,
        };
    } catch (error) {
        console.error('Error fetching repo data:', error);
        return null;
    }
}
