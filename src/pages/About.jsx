import React from 'react';
import useFetch from '../hooks/useFetch';
import { fetchProfile, getFullUrl } from '../api';
import meImg from '../assets/me.png';

const NAVBAR_HEIGHT = 72; // px
const NOTCH_GAP = 20; // px

const About = () => {
  const { data: profile, loading, error } = useFetch(fetchProfile, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  if (error) return <div className="text-red-500 text-center text-xl font-semibold">Failed to load profile.</div>;
  if (!profile) return null;

  return (
    <section
      className="relative flex items-start justify-center min-h-screen w-full bg-white text-gray-900 px-4 md:px-8"
      style={{ minHeight: `100vh`, paddingTop: `${NAVBAR_HEIGHT + 20}px` }}
    >
      {/* Card container with glassmorphism */}
      <div className="relative max-w-screen-md w-full mx-auto flex flex-col items-center justify-start bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-200/20 p-6 md:p-8 mt-4 animate-fade-in-slow">
        {/* User image with glowing border */}
        <div className="relative w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-lg border-4 border-blue-300/50 bg-gradient-to-br from-blue-200 to-purple-200 p-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] animate-fade-in">
          <img src={meImg} alt="Avatar" className="w-full h-full object-cover rounded-full" />
        </div>
        {/* Name and title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mt-4 mb-2 text-center drop-shadow-md animate-fade-in-slow">
          {profile.name}
        </h2>
        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 mb-4 text-center drop-shadow-sm animate-fade-in-slow">
          {profile.title}
        </h3>
        {/* Bio */}
        <p className="max-w-xl text-lg md:text-xl lg:text-2xl text-gray-600 font-medium text-center leading-relaxed mb-6 animate-fade-in-slow">
          {profile.bio}
        </p>
        {/* Contact details */}
        <div className="flex flex-col gap-2 text-base md:text-lg text-gray-600 mb-6 animate-fade-in-slow">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <b>Email:</b> {profile.email}
          </span>
          {profile.phone && (
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <b>Phone:</b> {profile.phone}
            </span>
          )}
          {profile.location && (
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <b>Location:</b> {profile.location}
            </span>
          )}
        </div>
        {/* Social links */}
        <div className="flex gap-6 justify-center mb-6 animate-fade-in-slow">
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 hover:text-blue-600 transition-transform transform hover:scale-125 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-3xl"
            >
              <i className="fab fa-github"></i>
            </a>
          )}
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 transition-transform transform hover:scale-125 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-3xl"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          )}
          {profile.twitter && (
            <a
              href={profile.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600 transition-transform transform hover:scale-125 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-3xl"
            >
              <i className="fab fa-twitter"></i>
            </a>
          )}
          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-700 hover:text-purple-900 transition-transform transform hover:scale-125 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] text-3xl"
            >
              <i className="fas fa-globe"></i>
            </a>
          )}
        </div>
        {/* CV Button */}
        {profile.cv_url && (
          <a
            href={getFullUrl(profile.cv_url)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-2 text-blue-600 font-bold text-lg border border-blue-300 rounded-full px-8 py-3 shadow-md hover:shadow-lg hover:border-blue-400 hover:text-blue-700 transition-transform transform hover:scale-105 animate-fade-in-slow"
          >
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Download CV
          </a>
        )}
      </div>
      <style>{`
        @keyframes fade-in-slow {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-slow {
          animation: fade-in-slow 1s cubic-bezier(0.4,0,0.2,1) both;
        }
        .animate-fade-in {
          animation: fade-in-slow 1s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </section>
  );
};

export default About;