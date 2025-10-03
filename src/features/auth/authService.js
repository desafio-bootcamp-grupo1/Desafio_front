import { api } from "@/lib/api";
import { setAccessToken, clearAccessToken } from "@/lib/token";

// Auth API helpers, isolated from Redux slice

export async function register({ email, password, username }) {
  try {
    const response = await api.post("/auth/register", {
      email,
      password,
      username,
      role: "driver",
    });
    
    const { data } = response;
    if (!data) throw new Error("No data received from server");
    if (!data.accessToken) throw new Error("No access token received");
    
    setAccessToken(data.accessToken);
    return data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
}

export async function login({ email, password }) {
  const { data } = await api.post("/auth/login", { email, password });
  if (data?.accessToken) setAccessToken(data.accessToken);
  return data;
}

export async function refreshToken() {
  const { data } = await api.post("/auth/refresh-token");
  if (data?.accessToken) setAccessToken(data.accessToken);
  return data;
}

export async function logout() {
  try {
    await api.post("/auth/logout");
  } finally {
    clearAccessToken();
  }
}

export async function getMe() {
  const { data } = await api.get("/users/me");
  return data;
}
export async function updateUserProfile(userData) {
  try {
    const response = await api.patch("/users/me", userData);
    const { data } = response;
    if (!data) throw new Error("No data received from server");
    return data;
  } catch (error) {
    console.error('Update user error:', error.response?.data || error.message);
    throw error;
  }
}


const authService = { register, login, refreshToken, logout, getMe, updateUserProfile };
export default authService;


