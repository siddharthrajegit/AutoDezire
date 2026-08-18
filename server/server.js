const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const { connectDB } = require('./config/db');
const { initializeData } = require('./services/store');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.use('/api/vehicles', require('./routes/vehicleRoutes'));
app.use('/api/recommendations', require('./routes/recommendationRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/saved', require('./routes/savedRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'AutoDezire API',
    tagline: 'Find the automobile that fits you',
    timestamp: new Date().toISOString()
  });
});

// Serve Frontend in Production (cPanel / Production build)
const clientBuildPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientBuildPath));

app.get('*', (req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'API endpoint not found' });
  }
  const indexPath = path.join(clientBuildPath, 'index.html');
  res.sendFile(indexPath, err => {
    if (err) {
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head><title>AutoDezire API Server</title></head>
        <body style="font-family:sans-serif;padding:40px;background:#0b0f19;color:#fff;text-align:center;">
          <h1 style="color:#f97316;">AutoDezire API Server is Running</h1>
          <p>Tagline: <em>Find the automobile that fits you.</em></p>
          <p>Frontend client build is ready. Run <code>npm run build</code> to generate client assets.</p>
        </body>
        </html>
      `);
    }
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Error Handler]', err.stack || err.message);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  await initializeData();

  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 AutoDezire Server running on http://localhost:${PORT}`);
    console.log(`✨ Tagline: Find the automobile that fits you.`);
    console.log(`🛡️  Admin Login: admin@autodezire.com / admin123`);
    console.log(`=======================================================`);
  });
}

startServer();
