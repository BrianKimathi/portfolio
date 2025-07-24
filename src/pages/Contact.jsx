import React from 'react';
import ContactForm from '../components/ContactForm';

const Contact = () => (
  <section
    className="relative flex items-start justify-center min-h-screen w-full bg-white text-gray-900 px-4 md:px-8"
    style={{ minHeight: `100vh`, paddingTop: `92px` }} // Navbar (72px) + minimal gap (20px)
  >
    <div className="max-w-lg w-full mx-auto mt-4">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 text-center drop-shadow-md animate-fade-in-slow">
        Contact Me
      </h2>
      <ContactForm />
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

export default Contact;