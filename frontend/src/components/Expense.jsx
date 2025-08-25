import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Expense() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [expenses, setExpenses] = useState(null);
  const [expAdd, setExpAdd] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  async function fetchExpenses() {
    try {
      const response = await fetch(`https://fintrack-1-d2g9.onrender.com/budget/${id}/expenses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch expenses");

      const data = await response.json();
      setExpenses(data.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, [id, expAdd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://fintrack-1-d2g9.onrender.com/budget/${id}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, amount: Number(amount) }),
      });

      if (!response.ok) throw new Error("Failed to add expense");

      setExpAdd((prev) => !prev);
      setName("");
      setAmount("");
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Error adding expense");
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        FinTracker
      </h1>

      <h2 className="text-xl font-semibold text-center mb-6">
        Budget Name: <span className="text-green-600">{expenses?.name}</span>
      </h2>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Add Expense Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/2"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Add Expense</h3>
          <input
            type="text"
            placeholder="Expense Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Add Expense
          </button>
        </form>

        {/* Expense List */}
        <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/2">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
            List of Expenses
          </h3>
          <ul className="space-y-3">
            {expenses?.budgets?.expenses?.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg shadow-sm"
              >
                <span>{item.name}</span>
                <span className="font-semibold">₹{item.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Budget Summary */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
        <div className="bg-white rounded-xl shadow-md px-6 py-4 w-full md:w-1/3 text-center font-semibold">
          Budget: ₹{expenses?.total}
        </div>
        <div className="bg-red-500 text-white rounded-xl shadow-md px-6 py-4 w-full md:w-1/3 text-center font-semibold">
          Used: ₹{expenses?.used}
        </div>
        <div className="bg-green-500 text-white rounded-xl shadow-md px-6 py-4 w-full md:w-1/3 text-center font-semibold">
          Left: ₹{expenses?.available}
        </div>
      </div>
    </div>
  );
}

export default Expense;
