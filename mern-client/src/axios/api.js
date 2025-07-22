import axios from "axios";

const API_URL = "http://localhost:5000";

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});
// Add request interceptor to include auth token if available
api.interceptors.request.use((config) => config);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized");
    }
    return Promise.reject(error);
  }
);

export const fetchAllBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/books`);
    return response.data;
  } catch (error) {
    console.log("error fetching data", error);
    throw error;
  }
};
export const fetchBookById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/books/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(`Error fetching book with id ${id}`, error);
    throw error;
  }
};
