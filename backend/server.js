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


const allowedOrigins = [
  'https://fin-track-gray.vercel.app',
  'http://localhost:5173',
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("Request origin:", origin);
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  },
  credentials: true,
}));


app.use(bodyParser.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

connectDB();
// app.use("/",(req,res)=>{
//      res.json({message:"Api is running"});
// })
app.use('/auth', authRoutes);
app.use('/budget', budgetRoutes);

app.listen(PORT, () => {
    console.log(process.env.MONGO_URI);
    console.log(`Server is running on port ${PORT}`);
});