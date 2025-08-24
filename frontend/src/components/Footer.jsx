// src/component/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo / Brand */}
          <div className="text-xl font-bold mb-4 md:mb-0">
            <Link to="/">FinTracker</Link>
          </div>

          {/* Quick Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link to="/" className="hover:text-gray-200">Home</Link>
            <Link to="/about" className="hover:text-gray-200">About</Link>
            <Link to="/profile" className="hover:text-gray-200">Profile</Link>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-200"><FaGithub size={20} /></a>
            <a href="#" className="hover:text-gray-200"><FaLinkedin size={20} /></a>
            <a href="#" className="hover:text-gray-200"><FaTwitter size={20} /></a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-400 mt-6 pt-4 text-center text-sm text-gray-200">
          © {new Date().getFullYear()} FinTracker. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
