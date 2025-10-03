// overviewService.js
import { api } from "@/lib/api";
import { getAccessToken } from "@/lib/token";

// ==================== USER OVERVIEW ====================
export async function getUserOverview({ month }) {
  try {
    const token = getAccessToken();
    const params = new URLSearchParams();
    if (month) {
      params.append('month', month);
    }

    const response = await api.get(`/overviews/user?${params.toString()}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      timeout: 30000,
    });
    
    const { data } = response;
    
    if (!data) throw new Error("No data received from server");
    
    return data;
  } catch (error) {
    console.error('❌ Service: Error', error);
    
    const errorMessage = error.response?.data?.error || error.message || "Error obteniendo overview";
    throw new Error(errorMessage);
  }
}

// ==================== MANAGER OVERVIEW ====================
export async function getManagerOverview({ month, top }) {
  try {
    
    const token = getAccessToken();
    
    const params = new URLSearchParams();
    if (month) params.append('month', month);
    if (top) params.append('top', top.toString());

    const response = await api.get(`/overviews/manager?${params.toString()}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      timeout: 30000,
    });
    
    const { data } = response;
    
    if (!data) throw new Error("No data received from server");
    
    return data;
  } catch (error) {
    console.error('❌ Service: Error', error);
    const errorMessage = error.response?.data?.error || error.message || "Error obteniendo manager overview";
    throw new Error(errorMessage);
  }
}

// ==================== WORKER OVERVIEW (Manager viendo trabajador) ====================
export async function getWorkerOverview({ userId, month }) {
  try {
    
    const token = getAccessToken();
    
    const params = new URLSearchParams();
    if (month) params.append('month', month);
    const response = await api.get(`/overviews/user/${userId}?${params.toString()}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      timeout: 30000,
    });
    
    const { data } = response;
    
    if (!data) throw new Error("No data received from server");
    
    return data;
  } catch (error) {
    console.error('❌ Service: Error', error);
    const errorMessage = error.response?.data?.error || error.message || "Error obteniendo worker overview";
    throw new Error(errorMessage);
  }
}

const overviewService = { 
  getUserOverview, 
  getManagerOverview, 
  getWorkerOverview 
};
export default overviewService;