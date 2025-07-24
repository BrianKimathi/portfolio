import React from 'react';
import meImg from '../assets/me.png';
import githubIcon from '../assets/github.png';
import linkedinIcon from '../assets/linkedin.png';

const NAVBAR_HEIGHT = 72; // px (approx 4.5rem)
const NOTCH_GAP = 20; // px (gap between navbar and notch)

const HeroSection = ({ profile }) => {
  if (!profile) return null;
  return (
    <section
      className="relative flex flex-row items-center justify-center w-full min-h-screen bg-white text-gray-900 px-0"
      style={{ minHeight: `100vh`, paddingTop: `${NAVBAR_HEIGHT + NOTCH_GAP + 20}px` }}
    >
      <div className="max-w-screen-xl w-full mx-auto flex flex-col md:flex-row">
        {/* Left: User image */}
        <div className="flex flex-1 items-center justify-center min-h-[340px] md:min-h-[540px]">
          <img
            src={meImg}
            alt="Me"
            className="w-[220px] h-[340px] md:w-[340px] md:h-[540px] object-cover rounded-2xl"
            style={{ minHeight: 320 }}
          />
        </div>
        {/* Right: Profile info and buttons */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-2 text-gray-900 text-center break-words">
            {profile.name}
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-700 text-center break-words">
            {profile.title}
          </h2>
          <p className="max-w-lg text-lg md:text-xl mb-8 text-gray-600 font-medium text-center break-words">
            {profile.bio}
          </p>
          <div className="flex gap-6 mt-2 mb-8 flex-wrap justify-center">
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-900 font-bold text-lg border border-gray-300 rounded-full px-6 py-2 shadow-sm hover:shadow-md hover:border-gray-400 transition bg-white"
              >
                <img src={githubIcon} alt="GitHub" className="w-6 h-6" /> GitHub
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-700 font-bold text-lg border border-blue-200 rounded-full px-6 py-2 shadow-sm hover:shadow-md hover:border-blue-400 transition bg-white"
              >
                <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6" /> LinkedIn
              </a>
            )}
          </div>
          {profile.cv_url && (
            <a
              href={profile.cv_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-white bg-gray-900 font-bold text-lg border border-gray-900 rounded-full px-8 py-3 shadow hover:bg-gray-800 hover:border-gray-800 transition"
            >
              Download CV
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;