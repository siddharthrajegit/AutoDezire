const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET, protect } = require('../middleware/authMiddleware');
const { memoryUsers } = require('../services/store');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');
const { sendError } = require('../middleware/errorHelper');

// Simple email format check
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Helper to generate JWT token
function generateToken(user) {
  return jwt.sign(
    { id: user._id || user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }  // Reduced from 30d
  );
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }
    if (typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Name must be at least 2 characters' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }
    if (typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    if (getIsConnected()) {
      const userExists = await User.findOne({ email: email.toLowerCase() });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'User already exists with this email' });
      }
      const user = await User.create({ name, email: email.toLowerCase(), password, role: 'user' });
      return res.status(201).json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user),
        },
      });
    }

    // Memory store fallback
    const exists = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      _id: `mem_user_${Date.now()}`,
      id: `mem_user_${Date.now()}`,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'user',
      profile: {
        height: 172,
        age: 28,
        budget: 14,
        dailyKm: 35,
        highwayPercent: 30,
        cityPercent: 60,
        ruralPercent: 10,
        roadConditions: 'Mixed with Potholes',
        regularPassengers: 2,
        hasChildren: false,
        hasElderly: false,
        topPriorities: ['Safety', 'Ground Clearance', 'Comfort']
      }
    };
    memoryUsers.push(newUser);

    res.status(201).json({
      success: true,
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        profile: newUser.profile,
        token: generateToken(newUser),
      },
    });
  } catch (error) {
    sendError(res, error);
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please enter email and password' });
    }

    // ── Admin login via environment configuration ───────────────────────────────
    // Credentials are read from ADMIN_EMAIL / ADMIN_PASSWORD in .env — NOT hardcoded.
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (
      adminEmail &&
      adminPassword &&
      email.toLowerCase() === adminEmail.toLowerCase() &&
      password === adminPassword
    ) {
      const adminUser = {
        id: 'admin_root',
        name: 'AutoDezire Admin',
        email: adminEmail,
        role: 'admin',
      };
      return res.json({
        success: true,
        data: {
          ...adminUser,
          token: generateToken(adminUser),
        },
      });
    }

    if (getIsConnected()) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user && (await user.matchPassword(password))) {
        return res.json({
          success: true,
          data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profile: user.profile,
            token: generateToken(user),
          },
        });
      }
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Memory store login
    const user = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password).catch(() => false);
      if (isMatch) {
        return res.json({
          success: true,
          data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profile: user.profile,
            token: generateToken(user),
          },
        });
      }
    }

    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    sendError(res, error);
  }
});

// GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  try {
    const user = memoryUsers.find(u => u._id === req.user.id || u.id === req.user.id);
    res.json({
      success: true,
      data: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        profile: user ? user.profile : undefined,
      },
    });
  } catch (error) {
    sendError(res, error);
  }
});

module.exports = router;
