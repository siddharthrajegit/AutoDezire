/**
 * Unified In-Memory & Database Store Provider
 * Guarantees seamless functionality whether MongoDB is connected or running offline.
 */

const { seedVehicles } = require('./seedData');
const { bikeSeedVehicles } = require('./bikeSeedData');
const Vehicle = require('../models/Vehicle');
const Bike = require('../models/Bike');
const { getIsConnected } = require('../config/db');

// In-memory vehicles storage initialized with seed data
let memoryVehicles = seedVehicles.map((v, index) => ({
  ...v,
  _id: `mem_veh_${index + 1}`,
  id: `mem_veh_${index + 1}`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

// In-memory bikes storage initialized with scraped Bikewale data
let memoryBikes = (bikeSeedVehicles || []).map((b, index) => ({
  ...b,
  _id: b.id || `mem_bike_${index + 1}`,
  id: b.id || `mem_bike_${index + 1}`,
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

// Seed / Sync database on startup if connected
async function initializeData() {
  if (getIsConnected()) {
    try {
      console.log('[Seed] Syncing/Updating MongoDB with full automobile specifications...');
      // Remove any non-car vehicles from the Vehicle collection (bikes have their own model)
      await Vehicle.deleteMany({ category: { $ne: 'Car' } });
      for (const veh of seedVehicles) {
        await Vehicle.findOneAndUpdate(
          { brand: veh.brand, model: veh.model },
          { $set: veh },
          { upsert: true, new: true }
        );
      }
      const count = await Vehicle.countDocuments();
      console.log(`[Seed] Successfully synchronized ${count} car models in MongoDB with complete dimensions & specs.`);

      console.log('[Seed] Syncing/Updating MongoDB with Bikewale motorcycle & scooter specifications...');
      for (const bike of bikeSeedVehicles) {
        await Bike.findOneAndUpdate(
          { brand: bike.brand, model: bike.model },
          { $set: bike },
          { upsert: true, new: true }
        );
      }
      const bikeCount = await Bike.countDocuments();
      console.log(`[Seed] Successfully synchronized ${bikeCount} bike models in MongoDB.`);
    } catch (err) {
      console.warn('[Seed] Error syncing MongoDB:', err.message);
    }
  }
}

async function getAllBikes(filter = {}) {
  if (getIsConnected()) {
    try {
      const query = { isActive: true };
      if (filter.category && filter.category !== 'All') {
        query.category = filter.category;
      }
      if (filter.brand && filter.brand !== 'All') {
        query.brand = filter.brand;
      }
      if (filter.search) {
        query.$or = [
          { brand: { $regex: filter.search, $options: 'i' } },
          { model: { $regex: filter.search, $options: 'i' } },
          { bodyType: { $regex: filter.search, $options: 'i' } }
        ];
      }
      return await Bike.find(query).sort({ brand: 1, model: 1 });
    } catch (e) {
      console.warn('[Store] DB query for bikes failed, falling back to memory store');
    }
  }

  let result = memoryBikes.filter(b => b.isActive !== false);
  if (filter.category && filter.category !== 'All') {
    result = result.filter(b => b.category.toLowerCase() === filter.category.toLowerCase());
  }
  if (filter.brand && filter.brand !== 'All') {
    result = result.filter(b => b.brand.toLowerCase() === filter.brand.toLowerCase());
  }
  if (filter.search) {
    const s = filter.search.toLowerCase();
    result = result.filter(b =>
      b.brand.toLowerCase().includes(s) ||
      b.model.toLowerCase().includes(s) ||
      (b.bodyType && b.bodyType.toLowerCase().includes(s))
    );
  }
  return result;
}

async function getBikeById(id) {
  if (getIsConnected()) {
    try {
      if (id.startsWith('mem_bike_') || !id.match(/^[0-9a-fA-F]{24}$/)) {
        const found = memoryBikes.find(b => b._id === id || b.id === id || b.model.toLowerCase() === id.toLowerCase());
        if (found) return found;
      }
      const dbBike = await Bike.findById(id);
      if (dbBike) return dbBike;
    } catch (e) {
      // Fallback
    }
  }
  return memoryBikes.find(b => b._id === id || b.id === id || b.model.toLowerCase() === id.toLowerCase());
}

async function getAllVehicles(filter = {}) {
  // If requesting bike-specific categories, return from bikes
  const bikeCategories = ['Motorcycle', 'Scooter', 'Electric Scooter'];
  if (filter.type === '2-wheeler' || (filter.category && bikeCategories.includes(filter.category))) {
    return await getAllBikes(filter);
  }

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
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const v = await Vehicle.findById(id);
        if (v) return v;
      }
    } catch (e) {
      // Fallback
    }
  }
  const memVeh = memoryVehicles.find(v => v._id === id || v.id === id || v.model.toLowerCase() === id.toLowerCase());
  if (memVeh) return memVeh;

  // Check in bikes if not found in cars
  return await getBikeById(id);
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
  getAllBikes,
  getBikeById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  memoryVehicles,
  memoryBikes,
  memoryUsers,
  memorySavedVehicles,
};
