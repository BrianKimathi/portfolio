import { useInView } from "../hooks/useInView";

const skillGroups = [
  {
    category: "Frontend",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "HTML / CSS"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "Python", "REST APIs", "PostgreSQL"],
  },
  {
    category: "Tools & DevOps",
    skills: ["Git", "GitHub Actions", "Docker", "Vite", "Figma"],
  },
  {
    category: "Currently Learning",
    skills: ["Rust", "Go", "Kubernetes", "AWS"],
  },
];

function SkillGroup({
  group,
  index,
}: {
  group: (typeof skillGroups)[number];
  index: number;
}) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.12 });

  return (
    <div
      ref={ref}
      className={`border border-gray-200 rounded-xl p-5 sm:p-6 fade-in ${
        isInView ? "visible" : ""
      } stagger-${Math.min(index + 1, 4)}`}
    >
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
        {group.category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="inline-block px-3 py-1.5 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:border-gray-300 transition-all duration-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.05 });

  return (
    <section
      id="skills"
      ref={ref}
      className="px-6 py-24 border-t border-gray-100"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-lg mx-auto">
          <span
            className={`inline-block text-xs font-medium text-gray-400 uppercase tracking-widest fade-in ${
              isInView ? "visible" : ""
            }`}
          >
            Toolkit
          </span>
          <h2
            className={`mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 fade-in stagger-2 ${
              isInView ? "visible" : ""
            }`}
          >
            Skills &amp; technologies
          </h2>
          <p
            className={`mt-3 text-gray-500 fade-in stagger-3 ${
              isInView ? "visible" : ""
            }`}
          >
            Technologies I reach for every day and a few I&apos;m exploring.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {skillGroups.map((group, index) => (
            <SkillGroup key={group.category} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
