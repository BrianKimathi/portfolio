import type { Project } from "../types";

export const projects: Project[] = [
  {
    slug: "weather-dashboard",
    title: "Weather Dashboard",
    summary:
      "A real-time weather dashboard with live forecasts, interactive maps, and 7-day trends.",
    description: [
      "A fully responsive weather dashboard that pulls live data from the OpenWeather API. Users can search any city, view a 7-day forecast, toggle between metric and imperial units, and explore weather patterns through interactive charts.",
      "The UI is built with a focus on clarity and speed — loading states, error handling, and empty states are covered end-to-end.",
    ],
    tech: ["React", "TypeScript", "OpenWeather API", "Chart.js"],
    link: "#",
    github: "#",
    features: [
      "City search with autocomplete suggestions",
      "7-day forecast with highs, lows, and precipitation",
      "Interactive charts for temperature and humidity trends",
      "Toggle between °C and °F",
      "Responsive layout for weather cards",
      "Offline-friendly with cached recent searches",
    ],
  },
  {
    slug: "task-manager",
    title: "Task Manager",
    summary:
      "A full-stack task management app with drag-and-drop boards, real-time collaboration, and auth.",
    description: [
      "A Trello-inspired task management application built with Next.js and Prisma. Users can create boards, add lists, and drag cards between columns.",
      "Real-time updates are powered by WebSockets so every team member sees changes instantly. Authentication is handled via NextAuth with Google and GitHub providers.",
    ],
    tech: ["Next.js", "Prisma", "PostgreSQL", "WebSockets"],
    link: "#",
    github: "#",
    features: [
      "Drag-and-drop Kanban boards",
      "Real-time collaboration via WebSockets",
      "User authentication (Google, GitHub)",
      "Board and card sharing with permissions",
      "Markdown support in card descriptions",
      "Activity log and notifications",
    ],
  },
  {
    slug: "ecommerce-storefront",
    title: "E-Commerce Storefront",
    summary:
      "A modern storefront with product filtering, cart management, Stripe checkout, and an admin dashboard.",
    description: [
      "A full-featured e-commerce platform built with React and Node.js. Shoppers can browse products by category, filter by price and rating, manage their cart, and check out securely via Stripe.",
      "The admin panel provides order management, inventory tracking, and sales analytics.",
    ],
    tech: ["React", "Node.js", "Stripe", "MongoDB"],
    link: "#",
    github: "#",
    features: [
      "Product catalog with category and price filtering",
      "Shopping cart with persistent state",
      "Secure Stripe payment integration",
      "Admin dashboard with sales analytics",
      "Inventory and order management",
      "Responsive product grid with quick-view modals",
    ],
  },
  {
    slug: "portfolio-site",
    title: "Portfolio Site",
    summary:
      "A minimal, responsive developer portfolio built with React and Tailwind CSS — focused on clean typography and fast load times.",
    description: [
      "This very site. Built with React, TypeScript, and Tailwind CSS, it emphasizes clean typography, smooth scroll animations, and a fully responsive layout.",
      "Every component handles loading, empty, and error states. The design is intentionally minimal and readable across all devices.",
    ],
    tech: ["React", "Tailwind CSS", "Vite"],
    link: "#",
    github: "#",
    features: [
      "Server-side rendering ready",
      "Scroll-triggered fade-in animations",
      "Fully responsive across all breakpoints",
      "Timeline-based experience section",
      "Contact form with validation",
      "Sub-100 KB CSS footprint",
    ],
  },
];

export const featuredProjects = projects.slice(0, 2);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
