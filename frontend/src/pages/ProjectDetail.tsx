import { Link, useParams } from "react-router-dom";
import { useInView } from "../hooks/useInView";
import { projects } from "../data/projects";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.05 });

  /* ── Not found ── */
  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-5">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Project not found
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            The project you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 underline underline-offset-2 transition-colors"
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
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Back link */}
      <div className="px-6 py-6">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
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

      {/* Project content */}
      <section ref={ref} className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          {/* Tags */}
          <div
            className={`flex flex-wrap gap-2 fade-in ${isInView ? "visible" : ""}`}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-2.5 py-0.5 bg-gray-100 text-gray-500 text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title & description */}
          <h1
            className={`mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 fade-in stagger-2 ${
              isInView ? "visible" : ""
            }`}
          >
            {project.title}
          </h1>
          <p
            className={`mt-4 text-base sm:text-lg text-gray-500 leading-relaxed fade-in stagger-3 ${
              isInView ? "visible" : ""
            }`}
          >
            {project.longDescription}
          </p>

          {/* Links */}
          <div
            className={`mt-8 flex flex-wrap gap-4 fade-in stagger-4 ${
              isInView ? "visible" : ""
            }`}
          >
            <a
              href={project.links.live}
              className="inline-block rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors duration-200"
            >
              View live
            </a>
            <a
              href={project.links.github}
              className="inline-block rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-colors duration-200"
            >
              View source
            </a>
          </div>

          {/* Features */}
          <div
            className={`mt-16 fade-in ${isInView ? "visible" : ""}`}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Key features
            </h2>
            <ul className="space-y-3">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm text-gray-600"
                >
                  <svg
                    className="w-4 h-4 text-gray-400 mt-0.5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
