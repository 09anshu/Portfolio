import { NextResponse } from 'next/server';
import { siteConfig, ProjectData } from '@/config/site';

export const revalidate = 3600; // revalidate at most every hour

export async function GET() {
    const username = siteConfig.github.username;
    const repos = siteConfig.featuredRepos;

    try {
        const enrichedProjects: ProjectData[] = await Promise.all(
            siteConfig.projects.map(async (project) => {
                try {
                    // Request repo metadata from GitHub API
                    const headers: HeadersInit = {
                        Accept: 'application/vnd.github.v3+json',
                        'User-Agent': 'Portfolio-App',
                    };

                    const repoRes = await fetch(`https://api.github.com/repos/${username}/${project.repo}`, {
                        headers,
                        next: { revalidate: 3600 },
                    });

                    if (!repoRes.ok) {
                        return project;
                    }

                    const repoData = await repoRes.json();

                    // Optionally fetch languages
                    let languages: string[] = project.tech;
                    try {
                        const langRes = await fetch(`https://api.github.com/repos/${username}/${project.repo}/languages`, {
                            headers,
                            next: { revalidate: 3600 },
                        });
                        if (langRes.ok) {
                            const langData = await langRes.json();
                            const topLangs = Object.keys(langData).slice(0, 4);
                            if (topLangs.length > 0) {
                                // Merge while preserving project-specific frameworks/libraries
                                languages = Array.from(new Set([...topLangs, ...project.tech])).slice(0, 5);
                            }
                        }
                    } catch {
                        // ignore language fetch failure
                    }

                    return {
                        ...project,
                        description: repoData.description || project.description,
                        github: repoData.html_url || project.github,
                        live: repoData.homepage || project.live,
                        stars: repoData.stargazers_count ?? project.stars,
                        forks: repoData.forks_count ?? project.forks,
                        updatedAt: repoData.updated_at,
                        tech: languages,
                    };
                } catch {
                    return project;
                }
            })
        );

        return NextResponse.json({
            success: true,
            username,
            projects: enrichedProjects,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            username,
            projects: siteConfig.projects,
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}
