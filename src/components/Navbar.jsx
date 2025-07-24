import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/experience', label: 'Experience' },
  { to: '/education', label: 'Education' },
  { to: '/certifications', label: 'Certifications' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-5xl rounded-2xl bg-white shadow-[0_4px_24px_0_rgba(0,0,0,0.08),0_0px_0_1px_#e5e7eb,0_0px_0_1px_#e5e7eb] border-b-8 border-l-8 border-r-8 border-gray-200 px-6 py-3 flex items-center justify-between transition-all duration-500 ${mounted ? 'animate-navbar-in' : 'opacity-0'}`} style={{backdropFilter: 'blur(8px)'}}>
      <Link to="/" className="text-xl font-extrabold tracking-tight text-gray-900">Brian Kimathi</Link>
      <button className="md:hidden text-gray-900 focus:outline-none" onClick={() => setOpen(!open)}>
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
        </svg>
      </button>
      <ul className={`md:flex gap-2 font-medium text-base transition-all duration-300 items-center ${open ? 'block absolute left-0 right-0 top-full bg-white text-gray-900 shadow-lg rounded-b-2xl py-6' : 'hidden md:flex static bg-transparent py-0 shadow-none rounded-none'}`}>
        {navLinks.map(link => (
          <li key={link.to} className="my-1 md:my-0">
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `relative px-3 py-1 mx-1 rounded transition-all duration-200 text-gray-700 hover:text-gray-900 hover:bg-gray-100 ${isActive ? 'font-bold' : ''}`
              }
              onClick={() => setOpen(false)}
            >
              {({ isActive }) => (
                <span className="inline-block relative">
                  {link.label}
                  {isActive && (
                    <span className="absolute left-1/4 bottom-0 w-1/2 h-[2px] bg-gray-900 rounded-full transition-all duration-300" />
                  )}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
      <style>{`
        @keyframes navbar-in {
          0% { opacity: 0; transform: translateY(-30px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-navbar-in {
          animation: navbar-in 0.7s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </nav>
  );
};

export default Navbar; 