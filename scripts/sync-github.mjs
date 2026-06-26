import { readFile, writeFile } from "node:fs/promises";

const projectsPath = new URL("../src/data/projects.json", import.meta.url);
const projects = JSON.parse(await readFile(projectsPath, "utf8"));

const token = process.env.GITHUB_TOKEN;
const headers = {
  "Accept": "application/vnd.github+json",
  "User-Agent": "portfolio-sync"
};

if (token) {
  headers.Authorization = `Bearer ${token}`;
}

async function githubJson(url) {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${url}`);
  }
  return response.json();
}

function decodeBase64(value) {
  return Buffer.from(value.replace(/\n/g, ""), "base64").toString("utf8");
}

function excerptMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[[^\]]+\]\([^)]*\)/g, (match) => match.slice(1).split("]")[0])
    .replace(/[#>*_`~-]/g, "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ")
    .slice(0, 220);
}

const updatedProjects = [];

for (const project of projects) {
  if (!project.repo || project.repo.includes("nombre-del-repo")) {
    updatedProjects.push(project);
    continue;
  }

  try {
    const repo = await githubJson(`https://api.github.com/repos/${project.repo}`);
    const nextProject = {
      ...project,
      url: repo.html_url ?? project.url,
      description: project.description || repo.description || "",
      language: project.language || repo.language || "",
      updatedAt: repo.updated_at ? repo.updated_at.slice(0, 10) : project.updatedAt,
      stars: repo.stargazers_count ?? project.stars
    };

    try {
      const readme = await githubJson(`https://api.github.com/repos/${project.repo}/readme`);
      nextProject.readmeExcerpt = project.readmeExcerpt || excerptMarkdown(decodeBase64(readme.content));
    } catch {
      nextProject.readmeExcerpt = project.readmeExcerpt;
    }

    updatedProjects.push(nextProject);
  } catch (error) {
    console.warn(`Skipping ${project.repo}: ${error.message}`);
    updatedProjects.push(project);
  }
}

await writeFile(projectsPath, `${JSON.stringify(updatedProjects, null, 2)}\n`);
console.log(`Updated ${updatedProjects.length} projects.`);
