import { useInView } from "../hooks/useInView";
import ProjectCard from "./ProjectCard";
import { featuredProjects } from "../data/projects";

export default function Projects() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="projects"
      ref={ref}
      className="px-6 py-12 sm:py-16 border-t border-gray-100 dark:border-gray-800/80"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          className={`text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white fade-in ${
            isInView ? "visible" : ""
          }`}
        >
          Featured Work
        </h2>
        <p
          className={`mt-2 text-gray-500 dark:text-gray-400 fade-in stagger-1 ${
            isInView ? "visible" : ""
          }`}
        >
          A selection of projects I&apos;ve built recently.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
