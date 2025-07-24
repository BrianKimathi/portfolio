import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { fetchProjects } from '../api';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: projects, loading, error } = useFetch(fetchProjects, []);
  const project = projects && projects.find(p => String(p.id) === String(id));
  const [selectedImage, setSelectedImage] = useState(null);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  if (error) return <div className="text-red-500 text-center text-xl font-semibold">Failed to load project.</div>;
  if (!project) return <div className="text-gray-900 text-center text-xl mt-20 font-semibold">Project not found.</div>;

  // Set initial selected image to the first image in the array
  const defaultImage = project.images && project.images.length > 0 ? project.images[0] : null;

  return (
    <section
      className="relative flex items-start justify-center min-h-screen w-full bg-white text-gray-900 px-4 md:px-8"
      style={{ minHeight: `100vh`, paddingTop: `92px` }}
    >
      <div
        className="max-w-3xl w-full mx-auto mt-4 bg-transparent border border-blue-300/50 shadow-lg rounded-xl p-6 animate-fade-in-slow transition-all duration-300 hover:shadow-xl hover:border-blue-400/50 hover:-translate-y-1"
        style={{ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)', transition: 'transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease' }}
        onMouseMove={e => {
          const card = e.currentTarget;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (centerY - y) / 20;
          const rotateY = (x - centerX) / 20;
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        }}
      >
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-gray-600 font-semibold text-base md:text-lg border border-blue-300 rounded-full px-4 py-2 shadow-md hover:shadow-lg hover:border-blue-400 hover:text-gray-700 transition-transform transform hover:scale-105"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center drop-shadow-sm">{project.title}</h2>
        {project.images && project.images.length > 0 && (
          <div className="flex flex-col gap-4 mb-6">
            <img
              src={selectedImage || defaultImage}
              alt={`${project.title} main`}
              className="w-full max-h-96 object-contain rounded-lg shadow-md border border-gray-200/50 hover:shadow-lg transition-shadow duration-300"
            />
            <div className="flex flex-wrap gap-2 justify-center">
              {project.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${project.title} thumbnail ${idx + 1}`}
                  className={`w-20 h-20 object-cover rounded-md border border-gray-200/50 cursor-pointer hover:opacity-80 transition-opacity duration-200 ${selectedImage === img ? 'ring-2 ring-blue-400' : ''}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-4">
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">{project.description}</p>
            {project.technologies && (
              <div className="flex flex-wrap gap-2">
                {project.technologies.split(',').map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-transparent border border-blue-300 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold shadow-md hover:bg-blue-50 transition-colors duration-300"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            )}
            {project.features && project.features.length > 0 && (
              <div className="text-base text-gray-600">
                <strong className="text-gray-800 font-semibold">Key Features:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex gap-4 mt-4">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 font-semibold text-base md:text-lg border border-blue-300 rounded-full px-4 py-2 shadow-md hover:shadow-lg hover:border-blue-400 hover:text-gray-700 transition-transform transform hover:scale-105"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.14 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.564 9.564 0 0112 6.8c.85.004 1.71.12 2.51.35 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"
                    />
                  </svg>
                  GitHub
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 font-semibold text-base md:text-lg border border-blue-300 rounded-full px-4 py-2 shadow-md hover:shadow-lg hover:border-blue-400 hover:text-gray-700 transition-transform transform hover:scale-105"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Live
                </a>
              )}
            </div>
          </div>
        </div>
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

export default ProjectDetails;