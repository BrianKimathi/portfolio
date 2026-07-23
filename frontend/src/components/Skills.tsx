import { useInView } from "../hooks/useInView";

const skillCategories = [
  {
    title: "Languages & Core",
    skills: ["TypeScript", "JavaScript", "Python", "Java", "HTML/CSS", "SQL"],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "Spring Boot",
      "Tailwind CSS",
      "Express",
    ],
  },
  {
    title: "Tools & Infrastructure",
    skills: ["Git", "Docker", "AWS (EC2, S3)", "Vite", "PostgreSQL", "Linux"],
  },
];

export default function Skills() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="skills"
      ref={ref}
      className="px-6 py-12 sm:py-16 border-t border-gray-100 dark:border-gray-800/80"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h2
          className={`text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white fade-in ${
            isInView ? "visible" : ""
          }`}
        >
          Skills & Technologies
        </h2>
        <p
          className={`mt-2 text-gray-500 dark:text-gray-400 fade-in stagger-1 ${
            isInView ? "visible" : ""
          }`}
        >
          Tools and technologies I use to bring ideas to life.
        </p>

        {/* Grid of categories */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, catIdx) => (
            <div
              key={cat.title}
              className={`fade-in stagger-${catIdx + 1} ${
                isInView ? "visible" : ""
              }`}
            >
              <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
