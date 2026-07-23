import { Link } from "react-router-dom";
import { useInView } from "../hooks/useInView";
import type { Project } from "../types";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { ref, isInView } = useInView<HTMLAnchorElement>({ threshold: 0.15 });

  return (
    <Link
      to={`/projects/${project.slug}`}
      ref={ref}
      className={`group block border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-sm transition-all duration-200 fade-in ${
        isInView ? "visible" : ""
      } stagger-${Math.min(index + 1, 4)}`}
    >
      <div className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center mb-4 group-hover:border-gray-300 transition-colors">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
        {project.title}
      </h3>
      <p className="mt-2 text-sm text-gray-500 leading-relaxed">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="inline-block px-2.5 py-0.5 bg-gray-100 text-gray-500 text-xs font-medium rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-gray-400 group-hover:text-gray-700 transition-colors">
        View details
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
