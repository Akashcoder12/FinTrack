// routes/budget.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Budget = require('../models/Budget');
require('dotenv').config();


// ========================
// Authentication middleware
// ========================
const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(" ")[1]; // remove "Bearer"
 
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. Token missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
    // 🔥 Ensure payload matches how you signed it
    // If you used { userId: user._id } while signing:
    req.user = await User.findById(decoded.userId);

    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    res.status(400).json({ success: false, message: 'Invalid token' });
  }
};

// ========================
// Helpers
// ========================
function calculateAmounts(budget) {
  const totalExpenses = budget.expenses.reduce((total, expense) => total + expense.amount, 0);
  const available = budget.totalAmount - totalExpenses;
  return { available, totalExpenses };
}

// ========================
// Routes
// ========================

// Get expenses for a budget
router.get('/:id/expenses', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const budget = await Budget.findOne({ _id: id, user: req.user._id });

    if (!budget) {
      return res.status(404).json({ success: false, message: 'Budget not found', expenses: [] });
    }

    const { available, totalExpenses } = calculateAmounts(budget);

    res.status(200).json({
      success: true,
      data: {
        name: budget.name,
        total: budget.totalAmount,
        available,
        used: totalExpenses,
        expenses: budget.expenses
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Create a new budget
router.post('/create', authMiddleware, async (req, res) => {
  const { name, totalAmount } = req.body;

  try {
    const newBudget = new Budget({
      name,
      totalAmount,
      user: req.user._id,
      expenses: []
    });

    await newBudget.save();
    res.status(201).json({ success: true, data: newBudget });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Add an expense to a budget
router.post('/:id/expenses', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, amount } = req.body;

  try {
    const budget = await Budget.findOne({ _id: id, user: req.user._id });
    if (!budget) {
      return res.status(404).json({ success: false, message: 'Budget not found' });
    }

    budget.expenses.push({ name, amount });
    await budget.save();

    res.status(200).json({ success: true, data: budget });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get all budgets for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user._id });

    const budgetsWithAmounts = budgets.map(budget => {
      const { available, totalExpenses } = calculateAmounts(budget);
      return {
        _id: budget._id,
        name: budget.name,
        totalAmount: budget.totalAmount,
        available,
        used: totalExpenses,
        user: budget.user
      };
    });

    res.status(200).json({ success: true, data: budgetsWithAmounts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
