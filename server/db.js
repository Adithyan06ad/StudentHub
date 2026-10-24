
const mongoose = require("mongoose");

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing from environment variables");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  console.log("MongoDB Atlas connected successfully!");
}

module.exports = connectDB;
