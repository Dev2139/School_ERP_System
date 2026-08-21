const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/school_erp';
    
    // Attempt standard connection with 3s timeout
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`[MongoDB] Local connection failed (${error.message}). Initializing MongoDB Memory Server...`);
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      const conn = await mongoose.connect(uri);
      console.log(`[MongoDB Memory Server] Connected successfully: ${uri}`);
      return conn;
    } catch (memError) {
      console.error(`[MongoDB] Memory server initialization failed:`, memError.message);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
