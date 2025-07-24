import React from 'react';

const Timeline = ({ items }) => (
  <div className="timeline relative flex flex-col gap-6 max-w-3xl mx-auto">
    {items.map((item, idx) => (
      <div
        className="timeline-item bg-transparent border border-blue-300/50 shadow-lg rounded-xl p-6 flex items-start gap-4 transition-all duration-300 hover:shadow-xl hover:border-blue-400/50 animate-fade-in-slow relative"
        key={idx}
      >
        {/* Timeline Dot */}
        <div className="absolute -left-3 top-6 w-4 h-4 bg-blue-400 rounded-full border-2 border-gray-200"></div>
        {/* Timeline Connector Line */}
        {idx < items.length - 1 && (
          <div className="absolute left-[-2px] top-10 h-[calc(100%+1.5rem)] w-0.5 bg-gray-200"></div>
        )}
        <div className="flex flex-col w-full">
          <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 drop-shadow-sm">
            {item.title || item.degree}
          </h4>
          <span className="text-base md:text-lg font-semibold text-gray-700 mb-1">
            {item.company || item.institution}
          </span>
          <span className="text-sm md:text-base text-gray-500 mb-2">
            {item.start_date} - {item.end_date || 'Present'}
          </span>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            {item.description}
          </p>
          {/* Referees Section */}
          {item.references && item.references.length > 0 && (
            <div className="mt-3">
              <div className="font-semibold text-blue-700 mb-1">Referee{item.references.length > 1 ? 's' : ''}</div>
              <ul className="flex flex-col gap-2">
                {item.references.map(ref => (
                  <li key={ref.id} className="bg-blue-50 border border-blue-200 rounded p-2 flex flex-col gap-1">
                    <div className="font-semibold">{ref.name}</div>
                    <div className="text-xs text-gray-600">{ref.email} {ref.phone && `| ${ref.phone}`}</div>
                    <div className="text-xs text-gray-500">{ref.note}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* End Referees Section */}
        </div>
      </div>
    ))}
  </div>
);

export default Timeline;