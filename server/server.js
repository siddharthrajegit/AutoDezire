const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables (supports root and server/ directory execution)
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config();

const { connectDB } = require('./config/db');
const { initializeData } = require('./services/store');

const app = express();

// ── Security Headers ────────────────────────────────────────────────────────
app.use(helmet());

// ── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
      'https://autodezire.onrender.com',
    ];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server requests (no origin) and listed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: Origin '${origin}' not allowed`));
      }
    },
    credentials: true,
  })
);

// ── Rate Limiters ─────────────────────────────────────────────────────────────
// Auth routes: max 20 attempts per 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

// AI chat: max 30 requests per minute
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'AI rate limit reached, please wait a moment.' },
});

// Recommendations: max 60 per minute (compute-heavy)
const recommendationsLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many recommendation requests, please slow down.' },
});

// ── Body Parsing (with size limit) ───────────────────────────────────────────
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// ── Request Logger (dev only) ─────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
  });
}

// ── API Routes (with rate limiters applied) ──────────────────────────────────
app.use('/api/vehicles', require('./routes/vehicleRoutes'));
app.use('/api/recommendations', recommendationsLimiter, require('./routes/recommendationRoutes'));
app.use('/api/ai', aiLimiter, require('./routes/aiRoutes'));
app.use('/api/auth', authLimiter, require('./routes/authRoutes'));
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

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  const isDev = process.env.NODE_ENV !== 'production';
  // Always log the full error server-side
  console.error('[Error Handler]', err.stack || err.message);
  // In production, never leak internal error details to the client
  res.status(err.status || 500).json({
    success: false,
    message: isDev ? (err.message || 'Internal Server Error') : 'An internal error occurred.',
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
    console.log(`=======================================================`);
  });
}

startServer();
