import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useInView } from "../hooks/useInView";
import { defaultExperience } from "../data/experience";
import type { Experience } from "../types";

const API_ENDPOINT = import.meta.env.VITE_EXPERIENCE_API_URL || "";

/* ── Skeleton ── */

function SkeletonItem() {
  return (
    <div className="relative pl-8 pb-12 border-l-2 border-gray-100 dark:border-gray-800 animate-pulse">
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-white dark:border-gray-950" />
      <div className="space-y-3">
        <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="space-y-2 pt-1">
          <div className="h-3 w-full bg-gray-100 dark:bg-gray-800/60 rounded" />
          <div className="h-3 w-5/6 bg-gray-100 dark:bg-gray-800/60 rounded" />
          <div className="h-3 w-2/3 bg-gray-100 dark:bg-gray-800/60 rounded" />
        </div>
        <div className="h-3 w-1/2 bg-gray-100 dark:bg-gray-800/60 rounded" />
      </div>
    </div>
  );
}

/* ── Error ── */

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="text-center py-16">
      <div className="w-12 h-12 mx-auto rounded-full bg-red-50 dark:bg-red-950/40 flex items-center justify-center mb-4">
        <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Couldn&apos;t load experience data.</p>
      <button type="button" onClick={onRetry} className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white underline underline-offset-2 transition-colors">
        Try again
      </button>
    </div>
  );
}

/* ── Empty ── */

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-12 h-12 mx-auto rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center mb-4">
        <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">No experience listed yet. Check back soon.</p>
    </div>
  );
}

/* ── Timeline item ── */

function TimelineItem({ item }: { item: Experience }) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <div ref={ref} className={`relative pl-8 pb-12 last:pb-0 border-l-2 border-gray-200 dark:border-gray-800 fade-in ${isInView ? "visible" : ""}`}>
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-gray-950 border-2 border-gray-400 dark:border-gray-600" />
      <div>
        <span className="inline-block text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">{item.period}</span>
        <h3 className="mt-1.5 text-lg font-semibold text-gray-900 dark:text-white">{item.role}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{item.company}</p>
        <ul className="mt-3 space-y-1.5">
          {item.description.map((bullet) => (
            <li key={bullet} className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex items-start gap-2">
              <span className="block w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-500 mt-2 shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-gray-400 dark:text-gray-500 font-medium">{item.stack}</p>
      </div>
    </div>
  );
}

/* ── Page ── */

export default function ExperiencePage() {
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

  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.05 });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 transition-colors duration-200">
      {/* Back link */}
      <div className="px-6 py-6">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
        </div>
      </div>

      <section ref={ref} className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white fade-in ${isInView ? "visible" : ""}`}>
            Experience
          </h1>
          <p className={`mt-2 text-gray-500 dark:text-gray-400 fade-in stagger-2 ${isInView ? "visible" : ""}`}>
            Every place I&apos;ve worked and what I did there.
          </p>

          <div className="mt-12">
            {status === "loading" && [1, 2, 3].map((i) => <SkeletonItem key={i} />)}
            {status === "error" && <ErrorState onRetry={fetchData} />}
            {status === "empty" && <EmptyState />}
            {status === "success" && data && (
              <div>
                {data.map((item) => (
                  <TimelineItem key={item.company + item.period} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
