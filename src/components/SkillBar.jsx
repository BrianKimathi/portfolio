import React from 'react';

const SkillBar = ({ skill }) => (
  <div className="bg-transparent border border-blue-300/50 shadow-lg rounded-xl p-4 flex items-center gap-4 transition-all duration-300 hover:shadow-xl hover:border-blue-400/50 animate-fade-in-slow">
    {skill.icon && (
      <img
        src={skill.icon}
        alt={skill.name}
        className="w-8 h-8 rounded-full bg-gray-200/50 p-1 object-cover"
      />
    )}
    <span className="font-semibold text-gray-900 text-base md:text-lg flex-1">{skill.name}</span>
    <div className="w-1/2 h-3 bg-gray-200/30 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full bg-blue-400 transition-all duration-500"
        style={{ width: `${skill.proficiency}%` }}
      />
    </div>
  </div>
);

export default SkillBar;