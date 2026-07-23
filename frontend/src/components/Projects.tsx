import { Link } from "react-router-dom";
import { useInView } from "../hooks/useInView";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

const PREVIEW_COUNT = 2;

export default function Projects() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.05 });

  return (
    <section
      id="projects"
      ref={ref}
      className="px-6 py-12 sm:py-16 border-t border-gray-100"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          className={`text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 fade-in ${
            isInView ? "visible" : ""
          }`}
        >
          Projects
        </h2>
        <p
          className={`mt-2 text-gray-500 max-w-lg fade-in stagger-2 ${
            isInView ? "visible" : ""
          }`}
        >
          A selection of things I&apos;ve built.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.slice(0, PREVIEW_COUNT).map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
        {projects.length > PREVIEW_COUNT && (
          <div className="mt-8 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors underline underline-offset-2"
            >
              View all {projects.length} projects
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
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
