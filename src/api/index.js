const API_BASE = 'https://portfolio-backend-x6q9.onrender.com/api';

export const fetchProfile = async () => (await fetch(`${API_BASE}/profile`)).json();
export const fetchProjects = async () => (await fetch(`${API_BASE}/projects`)).json();
export const fetchSkills = async () => (await fetch(`${API_BASE}/skills`)).json();
export const fetchExperience = async () => (await fetch(`${API_BASE}/experience`)).json();
export const fetchEducation = async () => (await fetch(`${API_BASE}/education`)).json();
export const fetchCertifications = async () => (await fetch(`${API_BASE}/certifications`)).json();
export const fetchStats = async () => (await fetch(`${API_BASE}/stats`)).json();
export const sendContact = async (data) => {
  return await fetch(`${API_BASE}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}; 