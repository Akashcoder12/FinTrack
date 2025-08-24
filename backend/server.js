// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const budgetRoutes = require('./routes/budget');
const cors = require('cors')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;


const allowedOrigins = ['http://localhost:5173']; // your frontend URL (Vite default)
app.use(cors({
  origin: allowedOrigins,
  credentials: true, // if you need cookies/auth
}));

app.use(bodyParser.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

connectDB();

app.use('/auth', authRoutes);
app.use('/budget', budgetRoutes);

app.listen(PORT, () => {
    console.log(process.env.MONGO_URI);
    console.log(`Server is running on port ${PORT}`);
});