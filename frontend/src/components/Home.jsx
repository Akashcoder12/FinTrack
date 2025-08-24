// src/component/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [budgets, setBudgets] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [budAdd, setAddBud] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Fetch budgets
  async function fetchBudgets() {
    try {
      const response = await fetch('http://localhost:4000/budget', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch budgets');
      }

      const data = await response.json();
      console.log("Budgets fetched:", data);
      setBudgets(data.data || []);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchBudgets();
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchBudgets();
    }
  }, [budAdd]);

  // Handle create budget
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/budget/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, totalAmount: Number(amount) }),
      });

      const data = await response.json();
      console.log('Budget created:', data);

      if (response.ok) {
        alert("Budget created");
        setName('');
        setAmount('');
        setAddBud(!budAdd);
      } else {
        alert(data.message || "Error creating budget");
      }
    } catch (error) {
      console.error('Error creating budget:', error);
      alert("Error creating budget");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-green-600 text-center mb-8">
        <u>FinTrack</u>
      </h1>

      {/* Form */}
      <div className="flex justify-center mb-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
        >
          <input
            type="text"
            placeholder="Enter Budget Name"
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-green-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            min="1"
            placeholder="Input Amount"
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-green-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Add Budget
          </button>
        </form>
      </div>

      {/* Budgets List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.length > 0 ? (
          budgets.map((bud) => (
            <div
              key={bud._id}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center"
            >
              <div className="text-lg font-semibold mb-2">
                Budget Name: <span className="text-blue-600">{bud.name}</span>
              </div>
              <div className="text-gray-700 mb-4">
                Amount: <span className="font-bold">₹{bud.totalAmount}</span>
              </div>
              <Link to={`expense/${bud._id}`}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                  Open Budget
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No budgets found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
