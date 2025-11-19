import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // include cookies
});
// ------------------------
// Generic request handler
// ------------------------
const handleRequest = async (requestFn, errorMessage) => {
  try {
    const response = await requestFn();
    return response.data;
  } catch (error) {
    console.error(`${errorMessage}:`, error.response?.data || error.message);
    throw error;
  }
};

// ------------------------
// AUTH
// ------------------------
export const login = (email, password) =>
  handleRequest(
    () => api.post("/auth/login", { email, password }),
    "Login failed"
  );

export const register = (name, email, password) =>
  handleRequest(
    () => api.post("/auth/register", { name, email, password }),
    "Registration failed"
  );

export const logout = () =>
  handleRequest(() => api.post("/auth/logout"), "Logout failed");

export const getCurrentUser = () =>
  handleRequest(() => api.get("/auth/me"), "Fetching current user failed");

// api.js
export const updateTheme = (darkMode) =>
  handleRequest(
    () => api.put("/users/updateTheme", { DarkMode: darkMode }), 
    "Updating theme failed"
  );

// ------------------------
// USER MANAGEMENT (ADMIN)
// ------------------------

// Get all users
export const getAllUsers = () =>
  handleRequest(() => api.get("/users/getAllUsers"), "Fetching users failed");

// Get user by ID
export const getUserById = (id) =>
  handleRequest(() => api.get(`/users/getUserById/${id}`), "Fetching user failed");

// get admin count
export const getAdminCount = () =>
  handleRequest(() => api.get("/users/getAdminCount"), "Fetching admin count failed");

// get regular user count
export const getRegularUserCount = () =>
  handleRequest(() => api.get("/users/getRegularUserCount"), "Fetching regular user count failed");