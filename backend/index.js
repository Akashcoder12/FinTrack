// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const budgetRoutes = require('./routes/budget');
const path=require("path");
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

 const _dirname=path.resolve();

const corsOptions={
   origin:"https://fintrack-2-59zk.onrender.com",
   Credential:true
}

app.use(cors(corsOptions));

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
app.use('/auth', authRoutes);
app.use('/budget', budgetRoutes);


app.use(express.static(path.join(_dirname,"/frontend/dist")));

app.get("/*splat",(req,res)=>{
      res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
});


app.listen(PORT, () => {
    console.log(process.env.MONGO_URI);
    console.log(`Server is running on port ${PORT}`);
});
