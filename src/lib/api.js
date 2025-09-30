import axios from "axios";
import { getAccessToken, setAccessToken } from "./token";
import { authHardLogout } from "../features/auth/authSlice"; //por si falla el refresh

const AUTH_PATHS = [/\/auth\/login\b/, /\/auth\/register\b/, /\/auth\/refresh-token\b/, /\/auth\/logout\b/];
const isAuthPath = (url) => Boolean(url) && AUTH_PATHS.some((re) => re.test(url));

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5000",
  withCredentials: true,
  timeout: 15000,
});

function attachAuthHeader(config, token) {
  config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` };
  return config;
}

let isRefreshing = false;
let refreshQueue = [];
function subscribe(cb) { refreshQueue.push(cb); }
function publish(token) { refreshQueue.forEach((cb) => cb(token)); refreshQueue = []; }

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) attachAuthHeader(config, token);
  return config;
});

const raw = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5001",
  withCredentials: true,
  timeout: 15000,
});

async function refreshAccessToken() {
  const { data } = await raw.post("/auth/refresh-token");
  if (!data?.accessToken) throw new Error("No accessToken in refresh response");
  return data.accessToken;
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const response = error?.response;
    const config = error?.config || {};

    if (!response || response.status !== 401 || config._retry || isAuthPath(config.url)) {
      return Promise.reject(error);
    }

    const code = response?.data?.code;
    const REFRESHABLE = new Set(["ACCESS_TOKEN_EXPIRED", "INVALID_ACCESS_TOKEN"]);
    const HARD_LOGOUT = new Set(["INVALID_REFRESH_TOKEN", "REFRESH_REUSE_DETECTED", "SESSION_NOT_FOUND", "UNAUTHORIZED"]);

    if (code && HARD_LOGOUT.has(code)) {
      setAccessToken(null);
      return Promise.reject(error);
    }
    if (code && !REFRESHABLE.has(code)) {
      return Promise.reject(error);
    }

    config._retry = true;

    if (isRefreshing) {
      const newToken = await new Promise((resolve) => subscribe(resolve));
      if (newToken) attachAuthHeader(config, newToken);
      return api(config);
    }

    try {
      isRefreshing = true;
      const newAccessToken = await refreshAccessToken();
      setAccessToken(newAccessToken);
      isRefreshing = false;
      publish(newAccessToken);

      attachAuthHeader(config, newAccessToken);
      return api(config);
    } catch (e) {
      isRefreshing = false;
      publish(null);
      setAccessToken(null);
      return Promise.reject(e);
    }
  }
);
