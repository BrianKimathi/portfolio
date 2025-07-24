import React from 'react';

const CertificationCard = ({ cert }) => (
  <div className="relative bg-transparent text-gray-900 rounded-xl p-6 flex flex-col items-start border border-gray-200/50 shadow-lg hover:shadow-xl hover:border-blue-300/50 transition-all duration-300 animate-fade-in-slow">
    <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 drop-shadow-sm">{cert.title}</h4>
    <span className="text-base md:text-lg font-semibold text-gray-700 mb-1">{cert.institution}</span>
    <span className="text-sm md:text-base text-gray-500 mb-3">{cert.date_awarded}</span>
    <p className="text-base md:text-lg text-gray-600 mb-4 leading-relaxed">{cert.description}</p>
    {cert.certificate_url && (
      <a
        href={cert.certificate_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto flex items-center gap-2 text-blue-600 font-semibold text-base md:text-lg border border-blue-300 rounded-full px-5 py-2 shadow-md hover:shadow-lg hover:border-blue-400 hover:text-blue-700 transition-transform transform hover:scale-105"
      >
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
        </svg>
        View Certificate
      </a>
    )}
  </div>
);

export default CertificationCard;