// ContactActions.js

import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_KEY = 'YourStrongSecret123';

export const logUserActivity = async (action, store) => {
  try {
    const username = localStorage.getItem('username') || 'Unknown';

    await axios.post(`${BACKEND_URL}/partner-log`, {
      username,
      action,
      storeName: store.name,
      storePhone: store.phone,
    }, {
      headers: { 'x-api-key': API_KEY },
    });
  } catch (err) {
    console.error('❌ Failed to log activity:', err.message);
  }
};
