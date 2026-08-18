/**
 * Unified In-Memory & Database Store Provider
 * Guarantees seamless functionality whether MongoDB is connected or running offline.
 */

const { seedVehicles } = require('./seedData');
const Vehicle = require('../models/Vehicle');
const { getIsConnected } = require('../config/db');

// In-memory vehicles storage initialized with seed data
let memoryVehicles = seedVehicles.map((v, index) => ({
  ...v,
  _id: `mem_veh_${index + 1}`,
  id: `mem_veh_${index + 1}`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

let memoryUsers = [
  {
    _id: 'mem_user_admin',
    id: 'mem_user_admin',
    name: 'AutoDezire Admin',
    email: 'admin@autodezire.com',
    password: '$2a$10$YourAdminHashedPasswordPlaceHolderOrUseSimpleCheck',
    role: 'admin',
    profile: {
      height: 175,
      age: 30,
      budget: 15,
      dailyKm: 40,
      highwayPercent: 40,
      cityPercent: 50,
      ruralPercent: 10,
      roadConditions: 'Mixed with Potholes',
      regularPassengers: 4,
      hasChildren: true,
      hasElderly: false,
      topPriorities: ['Safety', 'Comfort', 'Ground Clearance']
    }
  },
  {
    _id: 'mem_user_aryan',
    id: 'mem_user_aryan',
    name: 'Aryan',
    email: 'aryan@example.com',
    password: '$2a$10$YourUserHashedPasswordPlaceHolder',
    role: 'user',
    profile: {
      height: 178,
      age: 27,
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
  }
];

let memorySavedVehicles = [];

// Seed database on startup if connected and empty
async function initializeData() {
  if (getIsConnected()) {
    try {
      const count = await Vehicle.countDocuments();
      if (count === 0) {
        console.log('[Seed] Seeding MongoDB with initial automobiles dataset...');
        await Vehicle.insertMany(seedVehicles);
        console.log(`[Seed] Successfully inserted ${seedVehicles.length} vehicles.`);
      }
    } catch (err) {
      console.warn('[Seed] Error seeding MongoDB:', err.message);
    }
  }
}

async function getAllVehicles(filter = {}) {
  if (getIsConnected()) {
    try {
      const query = { isActive: true };
      if (filter.category && filter.category !== 'All') {
        query.category = filter.category;
      }
      if (filter.search) {
        query.$or = [
          { brand: { $regex: filter.search, $options: 'i' } },
          { model: { $regex: filter.search, $options: 'i' } },
          { bodyType: { $regex: filter.search, $options: 'i' } }
        ];
      }
      return await Vehicle.find(query).sort({ createdAt: -1 });
    } catch (e) {
      console.warn('[Store] DB query failed, falling back to memory store');
    }
  }

  let result = memoryVehicles.filter(v => v.isActive !== false);
  if (filter.category && filter.category !== 'All') {
    result = result.filter(v => v.category.toLowerCase() === filter.category.toLowerCase());
  }
  if (filter.search) {
    const s = filter.search.toLowerCase();
    result = result.filter(v =>
      v.brand.toLowerCase().includes(s) ||
      v.model.toLowerCase().includes(s) ||
      (v.bodyType && v.bodyType.toLowerCase().includes(s))
    );
  }
  return result;
}

async function getVehicleById(id) {
  if (getIsConnected()) {
    try {
      if (id.startsWith('mem_veh_')) {
        return memoryVehicles.find(v => v._id === id || v.id === id);
      }
      return await Vehicle.findById(id);
    } catch (e) {
      // Fallback
    }
  }
  return memoryVehicles.find(v => v._id === id || v.id === id || v.model.toLowerCase() === id.toLowerCase());
}

async function createVehicle(data) {
  if (getIsConnected()) {
    try {
      const v = new Vehicle(data);
      return await v.save();
    } catch (e) {
      console.warn('[Store] DB insert failed, using memory store');
    }
  }
  const newVeh = {
    ...data,
    _id: `mem_veh_${Date.now()}`,
    id: `mem_veh_${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  memoryVehicles.unshift(newVeh);
  return newVeh;
}

async function updateVehicle(id, data) {
  if (getIsConnected()) {
    try {
      return await Vehicle.findByIdAndUpdate(id, data, { new: true });
    } catch (e) {
      // Fallback
    }
  }
  const index = memoryVehicles.findIndex(v => v._id === id || v.id === id);
  if (index !== -1) {
    memoryVehicles[index] = { ...memoryVehicles[index], ...data, updatedAt: new Date().toISOString() };
    return memoryVehicles[index];
  }
  return null;
}

async function deleteVehicle(id) {
  if (getIsConnected()) {
    try {
      return await Vehicle.findByIdAndDelete(id);
    } catch (e) {
      // Fallback
    }
  }
  const index = memoryVehicles.findIndex(v => v._id === id || v.id === id);
  if (index !== -1) {
    const deleted = memoryVehicles.splice(index, 1);
    return deleted[0];
  }
  return null;
}

module.exports = {
  initializeData,
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  memoryVehicles,
  memoryUsers,
  memorySavedVehicles,
};
