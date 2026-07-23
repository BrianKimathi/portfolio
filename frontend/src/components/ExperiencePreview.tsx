import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useInView } from "../hooks/useInView";
import { defaultExperience } from "../data/experience";
import type { Experience } from "../types";

const API_ENDPOINT = import.meta.env.VITE_EXPERIENCE_API_URL || "";

export default function ExperiencePreview() {
  const [data, setData] = useState<Experience[] | null>(null);
  const [status, setStatus] = useState<"loading" | "success" | "error" | "empty">("loading");

  const fetchData = useCallback(async () => {
    if (!API_ENDPOINT) {
      setData(defaultExperience);
      setStatus("success");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(API_ENDPOINT);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: Experience[] | { data: Experience[] } = await res.json();
      const list = Array.isArray(json) ? json : json.data;
      if (list.length === 0) { setData([]); setStatus("empty"); }
      else { setData(list); setStatus("success"); }
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="experience"
      ref={ref}
      className="px-6 py-12 sm:py-16 border-t border-gray-100 dark:border-gray-800/80"
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className={`text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white fade-in ${
            isInView ? "visible" : ""
          }`}
        >
          Work Experience
        </h2>
        <p
          className={`mt-2 text-gray-500 dark:text-gray-400 fade-in stagger-1 ${
            isInView ? "visible" : ""
          }`}
        >
          My professional journey and key achievements.
        </p>

        <div className="mt-10">
          {status === "loading" && (
            <div className="space-y-8 animate-pulse">
              {[1, 2].map((i) => (
                <div key={i} className="pl-8 border-l-2 border-gray-100 dark:border-gray-800 space-y-2">
                  <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
                  <div className="h-5 w-48 bg-gray-200 dark:bg-gray-800 rounded" />
                  <div className="h-3 w-32 bg-gray-100 dark:bg-gray-800/60 rounded" />
                </div>
              ))}
            </div>
          )}

          {status === "error" && (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Couldn&apos;t load experience data.</p>
              <button
                type="button"
                onClick={fetchData}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white underline underline-offset-2"
              >
                Try again
              </button>
            </div>
          )}

          {status === "empty" && (
            <p className="text-sm text-gray-500 dark:text-gray-400 py-8 text-center">No experience listed yet.</p>
          )}

          {status === "success" && data && (
            <div className="space-y-10">
              {data.slice(0, 3).map((item) => (
                <div key={item.company + item.period} className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-800">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-gray-950 border-2 border-gray-400 dark:border-gray-600" />
                  <div>
                    <span className="inline-block text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      {item.period}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {item.role}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      {item.company}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                      {item.description[0]}
                    </p>
                    <p className="mt-3 text-xs text-gray-400 dark:text-gray-500 font-medium">
                      {item.stack}
                    </p>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <Link
                  to="/experience"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  View full experience & timeline
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
