import React from 'react';

const Stats = ({ stats }) => (
  <section className="stats-section">
    <h2>Stats</h2>
    <ul>
      <li>Total Projects: {stats.total_projects}</li>
      <li>Total Skills: {stats.total_skills}</li>
      <li>Total Education: {stats.total_education}</li>
      <li>Total Certifications: {stats.total_certifications}</li>
      <li>Total Contacts: {stats.total_contacts}</li>
    </ul>
    {/* TODO: Add charts/graphs for projects_by_month, skills_by_month */}
  </section>
);

export default Stats; 