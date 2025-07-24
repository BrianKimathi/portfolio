import React, { useState } from 'react';
import { sendContact } from '../api';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const response = await sendContact(form);
      if (response.ok) {
        setStatus('Message sent!');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (err) {
      setStatus('Failed to send message.');
    }
  };

  return (
    <form
      className="bg-transparent border border-gray-200/50 shadow-lg rounded-xl p-6 md:p-8 flex flex-col gap-4 animate-fade-in-slow"
      onSubmit={handleSubmit}
    >
      <div className="relative">
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full pl-10 pr-4 py-3 text-base md:text-lg text-gray-900 bg-transparent border border-blue-300 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-300/50 outline-none transition-all duration-300 placeholder-gray-500 hover:shadow-md"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <div className="relative">
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full pl-10 pr-4 py-3 text-base md:text-lg text-gray-900 bg-transparent border border-blue-300 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-300/50 outline-none transition-all duration-300 placeholder-gray-500 hover:shadow-md"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <div className="relative">
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full pl-10 pr-4 py-3 text-base md:text-lg text-gray-900 bg-transparent border border-blue-300 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-300/50 outline-none transition-all duration-300 placeholder-gray-500 hover:shadow-md resize-y min-h-[120px]"
        />
        <svg
          className="absolute left-3 top-5 w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      </div>
      <button
        type="submit"
        className="flex items-center gap-2 justify-center text-gray-600 font-semibold text-base md:text-lg border border-blue-300 rounded-full px-6 py-3 shadow-md hover:shadow-lg hover:border-blue-400 hover:text-gray-700 transition-transform transform hover:scale-105"
      >
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Send Message
      </button>
      <div className="text-center text-base md:text-lg text-gray-600 animate-fade-in-slow">
        {status}
      </div>
    </form>
  );
};

export default ContactForm;