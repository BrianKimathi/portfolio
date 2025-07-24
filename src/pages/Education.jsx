import React from 'react';
import useFetch from '../hooks/useFetch';
import { fetchEducation } from '../api';
import Timeline from '../components/Timeline';

const NAVBAR_HEIGHT = 72; // px
const NOTCH_GAP = 20; // px

const Education = () => {
  const { data: education, loading, error } = useFetch(fetchEducation, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  if (error) return <div className="text-red-500 text-center text-xl font-semibold">Failed to load education.</div>;
  if (!education) return null;

  return (
    <section
      className="relative flex items-start justify-center min-h-screen w-full bg-white text-gray-900 px-4 md:px-8"
      style={{ minHeight: `100vh`, paddingTop: `${NAVBAR_HEIGHT + 20}px` }}
    >
      <div className="max-w-screen-xl w-full mx-auto mt-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-10 text-center drop-shadow-md animate-fade-in-slow">
          My Education
        </h2>
        <Timeline items={education} />
      </div>
      <style>{`
        @keyframes fade-in-slow {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-slow {
          animation: fade-in-slow 1s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </section>
  );
};

export default Education;