import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPiggyBank } from 'react-icons/fa';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ correct way (clear removes everything)
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand / Logo */}
          <div className="text-xl font-bold">
            <Link to="/"> <FaPiggyBank /> FinTrack</Link>
          </div>

          {/* Links */}
          <div className="flex space-x-6 items-center">
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-200">
              About
            </Link>
            <Link to="/profile" className="hover:text-gray-200">
              Profile
            </Link>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
