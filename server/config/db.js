const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/autodezire';

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[Database] MongoDB connection skipped/failed: ${error.message}. Running with in-memory memory store.`);
    isConnected = false;
    return false;
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
