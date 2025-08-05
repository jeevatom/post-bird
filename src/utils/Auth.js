
import { jwtDecode } from "jwt-decode"; // ✅ CORRECT



export const isTokenValid = () => {
  const token = localStorage.getItem('jwtToken');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000; 
    return decoded.exp > now;
  } catch (err) {
    console.error("Invalid token:", err);
    return false;
  }
};


export const getUserFromToken = () => {
  const token = localStorage.getItem('jwtToken');
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
};


export const logoutUser = () => {
  localStorage.removeItem('jwtToken');
  window.location.href = '/login'; 
};
