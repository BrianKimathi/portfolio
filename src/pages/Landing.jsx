import React from 'react';
import HeroSection from '../components/HeroSection';
import useFetch from '../hooks/useFetch';
import { fetchProfile } from '../api';

const Landing = () => {
  const { data: profile, loading, error } = useFetch(fetchProfile, []);

  console.log('Landing: loading', loading);
  console.log('Landing: error', error);
  console.log('Landing: profile', profile);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] bg-white animate-fade-in">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400 border-solid mb-4"></div>
      <span className="text-lg text-yellow-600 font-semibold">Loading profile...</span>
    </div>
  );

  if (error) return (
    <section className="relative flex flex-col items-center justify-center text-center py-24 min-h-[70vh] bg-white animate-fade-in overflow-hidden">
      {/* Animated floating shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-400 bg-opacity-30 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 bg-opacity-20 rounded-full blur-2xl animate-pulse" />
      <div className="w-36 h-36 rounded-full bg-yellow-200 flex items-center justify-center mb-8 shadow-2xl animate-float-slow">
        <span className="text-6xl text-gray-700 drop-shadow-lg">👤</span>
      </div>
      <h1 className="text-5xl md:text-6xl font-extrabold mb-3 text-yellow-600 animate-gradient-x">Welcome to MyPortfolio</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800 drop-shadow">A Modern Portfolio</h2>
      <p className="max-w-xl text-lg mb-8 text-gray-700 font-medium">Showcasing projects, skills, experience, education, and more. Enjoy a vibrant, interactive experience!</p>
      <div className="flex gap-4 justify-center mb-6">
        <a href="/about" className="bg-yellow-400 text-blue-900 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-300 hover:scale-105 transition-all duration-300 animate-bounce">Explore Portfolio</a>
      </div>
      <div className="text-red-500 mt-4 font-semibold">Failed to load profile. Showing default landing page.</div>
    </section>
  );

  if (!profile || Object.keys(profile).length === 0) return (
    <section className="relative flex flex-col items-center justify-center text-center py-24 min-h-[70vh] bg-white animate-fade-in overflow-hidden">
      {/* Animated floating shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-400 bg-opacity-30 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 bg-opacity-20 rounded-full blur-2xl animate-pulse" />
      <div className="w-36 h-36 rounded-full bg-yellow-200 flex items-center justify-center mb-8 shadow-2xl animate-float-slow">
        <span className="text-6xl text-gray-700 drop-shadow-lg">👤</span>
      </div>
      <h1 className="text-5xl md:text-6xl font-extrabold mb-3 text-yellow-600 animate-gradient-x">Welcome to MyPortfolio</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800 drop-shadow">A Modern Portfolio</h2>
      <p className="max-w-xl text-lg mb-8 text-gray-700 font-medium">No profile data yet. Please add your profile in the admin dashboard.</p>
      <div className="flex gap-4 justify-center mb-6">
        <a href="/about" className="bg-yellow-400 text-blue-900 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-300 hover:scale-105 transition-all duration-300 animate-bounce">Explore Portfolio</a>
      </div>
    </section>
  );

  return (
    <main className="relative min-h-[70vh] bg-white animate-fade-in overflow-hidden">
      {/* Animated floating shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-400 bg-opacity-30 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 bg-opacity-20 rounded-full blur-2xl animate-pulse" />
      <HeroSection profile={profile} />
    </main>
  );
};

export default Landing; 