import { Link } from "react-router-dom";
import { useInView } from "../hooks/useInView";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function ProjectsPage() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.05 });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 transition-colors duration-200">
      {/* Back link */}
      <div className="px-6 py-6">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
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
            Back to home
          </Link>
        </div>
      </div>

      <section ref={ref} className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <h1
            className={`text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white fade-in ${
              isInView ? "visible" : ""
            }`}
          >
            Projects
          </h1>
          <p
            className={`mt-2 text-gray-500 dark:text-gray-400 fade-in stagger-2 ${
              isInView ? "visible" : ""
            }`}
          >
            Everything I&apos;ve built, documented, and shipped.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
