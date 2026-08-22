require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () => {
      console.log(`[School ERP Server] Running on http://localhost:${PORT}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`[Server Warning]: Port ${PORT} is currently busy. Please stop the active process or restart.`);
        process.exit(1);
      } else {
        console.error('[Server Error]:', err);
      }
    });
  } catch (err) {
    console.error('[Server Error]:', err.message);
    process.exit(1);
  }
};

startServer();
