import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { fetchProjects } from '../api';
import ProjectCard from '../components/ProjectCard';

const NAVBAR_HEIGHT = 72; // px

const Projects = () => {
  const { data: projects, loading, error } = useFetch(fetchProjects, []);
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  if (error) return <div className="text-red-500 text-center text-xl font-semibold">Failed to load projects.</div>;
  if (!projects) return null;

  return (
    <section
      className="relative flex items-start justify-center min-h-screen w-full bg-white text-gray-900 px-4 md:px-8"
      style={{ minHeight: `100vh`, paddingTop: `${NAVBAR_HEIGHT + 20}px` }}
    >
      <div className="max-w-screen-xl w-full mx-auto mt-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-10 text-center drop-shadow-md animate-fade-in-slow">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} onClick={() => navigate(`/projects/${project.id}`)} className="cursor-pointer">
              <ProjectCard project={project} />
            </div>
          ))}
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

export default Projects;