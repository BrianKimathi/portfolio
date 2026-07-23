import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectBySlug } from "../data/projects";
import type { Project } from "../types";

const API_ENDPOINT = import.meta.env.VITE_PROJECTS_API_URL || "";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const local = getProjectBySlug(slug);

    if (!API_ENDPOINT) {
      setProject(local || null);
      setLoading(false);
      return;
    }

    fetch(`${API_ENDPOINT}/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setProject(data))
      .catch(() => setProject(local || null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 px-6">
        <div className="max-w-3xl mx-auto space-y-4 animate-pulse">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-8 w-2/3 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-4 w-full bg-gray-100 dark:bg-gray-800/60 rounded" />
          <div className="h-64 w-full bg-gray-100 dark:bg-gray-900 rounded-xl mt-6" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 px-6 text-center">
        <div className="max-w-sm mx-auto py-16">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Project not found
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            to="/projects"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white underline underline-offset-2"
          >
            Back to all projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 transition-colors duration-200">
      {/* Back link */}
      <div className="px-6 py-6">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to projects
          </Link>
        </div>
      </div>

      <article className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {project.title}
          </h1>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            {project.summary}
          </p>

          {/* Tech stack tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="inline-block px-2.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Featured Image placeholder / screenshot */}
          {project.image && (
            <div className="mt-8 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover max-h-[400px]"
              />
            </div>
          )}

          {/* Full description */}
          <div className="mt-10 space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            {project.description.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Action links */}
          <div className="mt-10 flex flex-wrap gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-gray-900 dark:bg-white px-6 py-3 text-sm font-medium text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
              >
                Visit live site
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                View source on GitHub
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
