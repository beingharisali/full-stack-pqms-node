const mongoose = require("mongoose");

const connectDB = async (url) => {
  if (!url) {
    throw new Error("MONGO_URI is missing. Please check your .env file");
  }
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
