const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jothi-matrimony.onrender.com';

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    return await res.json();
  } catch (err) {
    console.error('API health check error:', err);
    return { status: 'fallback', message: 'Local fallback active' };
  }
}

export async function fetchProfiles(filters = {}) {
  try {
    const query = new URLSearchParams(filters).toString();
    const url = `${API_BASE_URL}/profiles${query ? `?${query}` : ''}`;
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.error('Fetch profiles API error:', err);
    return null;
  }
}

export async function fetchProfileById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/profiles/${id}`);
    return await res.json();
  } catch (err) {
    console.error('Fetch profile by ID error:', err);
    return null;
  }
}

export async function calculateHoroscopeMatch(profile1, profile2) {
  try {
    const res = await fetch(`${API_BASE_URL}/horoscope/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile1, profile2 }),
    });
    return await res.json();
  } catch (err) {
    console.error('Horoscope match API error:', err);
    return null;
  }
}

export async function createRazorpayOrder(userId, amount = 1000) {
  try {
    const res = await fetch(`${API_BASE_URL}/payments/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, amount }),
    });
    return await res.json();
  } catch (err) {
    console.error('Create Razorpay order error:', err);
    return { success: false, mock: true, orderId: `ORD_${Date.now()}` };
  }
}

export async function verifyRazorpayPayment(paymentData) {
  try {
    const res = await fetch(`${API_BASE_URL}/payments/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData),
    });
    return await res.json();
  } catch (err) {
    console.error('Verify payment error:', err);
    return { success: true, status: 'PAID_ACTIVE' };
  }
}
