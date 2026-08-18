/**
 * AutoDezire API Service
 */

const API_BASE = '/api';

export async function fetchVehicles(params = {}) {
  try {
    const searchParams = new URLSearchParams();
    if (params.category && params.category !== 'All') searchParams.append('category', params.category);
    if (params.search) searchParams.append('search', params.search);

    const res = await fetch(`${API_BASE}/vehicles?${searchParams.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch vehicles');
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.warn('[API] fetchVehicles fallback to local data:', error.message);
    return null;
  }
}

export async function fetchVehicleById(id) {
  try {
    const res = await fetch(`${API_BASE}/vehicles/${id}`);
    if (!res.ok) throw new Error('Vehicle not found');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn('[API] fetchVehicleById fallback:', error.message);
    return null;
  }
}

export async function submitEvaluation(vehicleId, profile) {
  try {
    const res = await fetch(`${API_BASE}/vehicles/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vehicleId, profile })
    });
    if (!res.ok) throw new Error('Evaluation request failed');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn('[API] submitEvaluation fallback:', error.message);
    return null;
  }
}

export async function fetchRecommendations(profile) {
  try {
    const res = await fetch(`${API_BASE}/recommendations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile })
    });
    if (!res.ok) throw new Error('Recommendation request failed');
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn('[API] fetchRecommendations fallback:', error.message);
    return null;
  }
}

export async function sendAiAdvisorChat(payload) {
  try {
    const res = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('AI Advisor request failed');
    const data = await res.json();
    return data.data?.reply || 'I am analyzing your query against the vehicle specifications and user requirements.';
  } catch (error) {
    console.warn('[API] sendAiAdvisorChat fallback:', error.message);
    return null;
  }
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data.data;
}

export async function registerUser(name, email, password) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data.data;
}
