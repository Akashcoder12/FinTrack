import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          About FinTracker
        </h1>
        <p className="text-gray-700 text-lg">
          GFG Expense Tracker is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to help users manage their budgets and track expenses easily. Built with modern web technologies, it provides a secure and user-friendly experience for personal finance management.
        </p>
      </div>

      {/* Features Section */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {/* Feature 1 */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">Secure Authentication</h2>
          <p className="text-gray-600">
            Users can register, login, and manage their budgets securely with JWT authentication.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">Budget Management</h2>
          <p className="text-gray-600">
            Create multiple budgets, set total amounts, track used and available funds, and stay on top of your finances.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">Expense Tracking</h2>
          <p className="text-gray-600">
            Add, delete, and monitor expenses in real-time. Visualize your spending patterns to manage your money effectively.
          </p>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="max-w-4xl mx-auto mt-12 text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Tech Stack Used</h2>
        <p className="text-gray-700 mb-6">
          This project is built using the MERN stack with React for frontend, Node.js and Express for backend, and MongoDB for database. Tailwind CSS is used for modern responsive UI styling.
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-semibold">MongoDB</span>
          <span className="px-4 py-2 bg-green-100 text-green-600 rounded-full font-semibold">Express.js</span>
          <span className="px-4 py-2 bg-yellow-100 text-yellow-600 rounded-full font-semibold">React.js</span>
          <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full font-semibold">Node.js</span>
          <span className="px-4 py-2 bg-teal-100 text-teal-600 rounded-full font-semibold">Tailwind CSS</span>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-4xl mx-auto text-center mt-12 mb-6 text-gray-600">
        <p>
          Designed and developed by <span className="font-semibold">Your Name</span>. This project demonstrates a complete full-stack MERN application with authentication, CRUD operations, and responsive UI.
        </p>
      </div>
    </div>
  );
}
