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

//* get all rentals 
export const getActiveRentals = () =>
  handleRequest(() => api.get("/rentals/getAllRentals"), "Fetching rentals failed");

//* update renatal status
export const updateRental = (rentalId, updateData) =>
  handleRequest(
    () => api.patch(`/rentals/updateRental/${rentalId}`, updateData),
    "Updating rental failed"
  );