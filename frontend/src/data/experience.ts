import type { Experience } from "../types";

export const defaultExperience: Experience[] = [
  {
    role: "Senior Full-Stack Developer",
    company: "Studio Nine",
    period: "2024 — Present",
    description: [
      "Led the redesign of a flagship SaaS product, improving page load times by 40%.",
      "Mentored a team of 4 junior developers through code reviews and pair programming.",
      "Architected a real-time collaboration feature using WebSockets and Redis.",
    ],
    stack: "React · Node.js · PostgreSQL · Docker",
  },
  {
    role: "Full-Stack Developer",
    company: "OpenGrid",
    period: "2022 — 2024",
    description: [
      "Built and maintained RESTful APIs serving 100k+ daily active users.",
      "Developed a component library adopted across 3 product teams.",
      "Migrated legacy jQuery codebase to React, reducing technical debt by 60%.",
    ],
    stack: "TypeScript · Next.js · Prisma · AWS",
  },
  {
    role: "Junior Developer",
    company: "Pixel Labs",
    period: "2020 — 2022",
    description: [
      "Contributed to an internal tooling platform used by 200+ employees.",
      "Wrote unit and integration tests, achieving 85% code coverage.",
      "Collaborated with designers to implement pixel-perfect UI components.",
    ],
    stack: "React · Python · MySQL · Git",
  },
];
