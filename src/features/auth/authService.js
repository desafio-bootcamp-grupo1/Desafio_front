import { api } from "@/lib/api";
import { setAccessToken, clearAccessToken } from "@/lib/token";

// Auth API helpers, isolated from Redux slice

export async function register({ email, password, username }) {
  try {
    const response = await api.post("/auth/register", {
      email,
      password,
      username,
      role: "driver", // All users are drivers by default
    });
    
    const { data } = response;
    if (!data) throw new Error("No data received from server");
    if (!data.accessToken) throw new Error("No access token received");
    
    setAccessToken(data.accessToken);
    return data; // { user, accessToken }
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
}

export async function login({ email, password }) {
  const { data } = await api.post("/auth/login", { email, password });
  if (data?.accessToken) setAccessToken(data.accessToken);
  return data; // { user, accessToken }
}

export async function refreshToken() {
  const { data } = await api.post("/auth/refresh-token");
  if (data?.accessToken) setAccessToken(data.accessToken);
  return data; // { accessToken }
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
  return data; // user
}

const authService = { register, login, refreshToken, logout, getMe };
export default authService;


