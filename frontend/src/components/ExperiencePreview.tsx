import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useInView } from "../hooks/useInView";
import { defaultExperience } from "../data/experience";
import type { Experience } from "../types";

const API_ENDPOINT = import.meta.env.VITE_EXPERIENCE_API_URL || "";
const PREVIEW_COUNT = 2;

/* ── Skeleton ── */
function SkeletonItem() {
  return (
    <div className="relative pl-8 pb-12 border-l-2 border-gray-100 animate-pulse">
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-200 border-2 border-white" />
      <div className="space-y-3">
        <div className="h-3 w-24 bg-gray-200 rounded" />
        <div className="h-5 w-3/4 bg-gray-200 rounded" />
        <div className="h-3 w-1/3 bg-gray-200 rounded" />
        <div className="space-y-2 pt-1">
          <div className="h-3 w-full bg-gray-100 rounded" />
          <div className="h-3 w-5/6 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  );
}

/* ── Timeline item ── */
function TimelineItem({ item }: { item: Experience }) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`relative pl-8 pb-12 last:pb-0 border-l-2 border-gray-200 fade-in ${
        isInView ? "visible" : ""
      }`}
    >
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-gray-400" />
      <div>
        <span className="inline-block text-xs font-medium text-gray-400 uppercase tracking-wider">
          {item.period}
        </span>
        <h3 className="mt-1.5 text-lg font-semibold text-gray-900">
          {item.role}
        </h3>
        <p className="text-sm text-gray-500 mt-0.5">{item.company}</p>
        <ul className="mt-3 space-y-1.5">
          {item.description.map((bullet) => (
            <li
              key={bullet}
              className="text-sm text-gray-600 leading-relaxed flex items-start gap-2"
            >
              <span className="block w-1 h-1 rounded-full bg-gray-400 mt-2 shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ExperiencePreview() {
  const [data, setData] = useState<Experience[] | null>(null);
  const [status, setStatus] = useState<
    "loading" | "success" | "error" | "empty"
  >("loading");

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
      if (list.length === 0) {
        setData([]);
        setStatus("empty");
      } else {
        setData(list);
        setStatus("success");
      }
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.05 });

  return (
    <section
      id="experience"
      ref={ref}
      className="px-6 py-12 sm:py-16 border-t border-gray-100"
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className={`text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 fade-in ${
            isInView ? "visible" : ""
          }`}
        >
          Experience
        </h2>
        <p
          className={`mt-2 text-gray-500 fade-in stagger-2 ${
            isInView ? "visible" : ""
          }`}
        >
          Places I&apos;ve worked and things I&apos;ve built along the way.
        </p>

        <div className="mt-12">
          {/* Loading */}
          {status === "loading" &&
            [1, 2].map((i) => <SkeletonItem key={i} />)}

          {/* Error — on home page just fall back to defaults silently */}
          {status === "error" && (
            <div>
              {defaultExperience.slice(0, PREVIEW_COUNT).map((item) => (
                <TimelineItem
                  key={item.company + item.period}
                  item={item}
                />
              ))}
            </div>
          )}

          {/* Empty */}
          {status === "empty" && (
            <div className="text-center py-12">
              <p className="text-sm text-gray-500">
                No experience listed yet. Check back soon.
              </p>
            </div>
          )}

          {/* Success */}
          {status === "success" && data && (
            <div>
              {data.slice(0, PREVIEW_COUNT).map((item) => (
                <TimelineItem
                  key={item.company + item.period}
                  item={item}
                />
              ))}
            </div>
          )}
        </div>

        {/* "View all" link — only show when there's more data */}
        {status === "success" && data && data.length > PREVIEW_COUNT && (
          <div className="mt-8 text-center">
            <Link
              to="/experience"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors underline underline-offset-2"
            >
              View all {data.length} positions
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
