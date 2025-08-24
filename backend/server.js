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
  "http://localhost:5173",
  "https://fin-track-gray.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman / server calls
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ✅ explicitly handle preflight requests
app.options("*", cors());

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