import { Link } from "react-router-dom";
import { useInView } from "../hooks/useInView";
import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const staggerClass = `stagger-${(index % 4) + 1}`;

  return (
    <div
      ref={ref}
      className={`group relative flex flex-col justify-between rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm transition-all duration-200 fade-in ${staggerClass} ${
        isInView ? "visible" : ""
      }`}
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
          <Link to={`/projects/${project.slug}`}>
            <span className="absolute inset-0" />
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {project.summary}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="inline-block px-2.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="text-xs font-medium text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex items-center gap-1">
          View details
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
