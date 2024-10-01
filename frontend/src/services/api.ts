import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Update with your backend API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add authentication token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercept responses to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Handle unauthorized error, e.g., redirect to login page
    }
    return Promise.reject(error);
  }
);

export const login = (email: string, password: string) => {
  return api.post('/auth/login', { email, password });
};

export const getUserPreferences = () => {
  return api.get('/users/preferences');
};

export const updateUserPreferences = (preferences: string[]) => {
  return api.post('/users/preferences', { preferences });
};

export const getDestinationSuggestions = () => {
  return api.get('/users/suggest-destinations');
};

export const createItinerary = (destination: string, lengthOfStay: number) => {
  return api.post('/users/create-itinerary', { destination, lengthOfStay });
};

export const getItinerary = () => {
  return api.get('/users/itinerary');
};