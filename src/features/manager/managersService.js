// managerService.js
import { api } from "@/lib/api";
import { getAccessToken } from "@/lib/token";

// ==================== WORKERS LIST ====================
export async function getWorkers({ q = '', page = 1, limit = 20, include = '' }) {
  try {
    const token = getAccessToken();
    
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (q) params.append('q', q);
    if (include) params.append('include', include);

    const response = await api.get(`/manager/workers?${params.toString()}`, {
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
    
    const errorMessage = error.response?.data?.error || error.message || "Error obteniendo trabajadores";
    throw new Error(errorMessage);
  }
}

// ==================== WORKER TICKETS ====================
export async function getWorkerTickets({ userId, month, page = 1, limit = 20, domain }) {
  try {
    
    const token = getAccessToken();
    
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (month) params.append('month', month);
    if (domain) params.append('domain', domain);

    const response = await api.get(`/manager/workers/${userId}/tickets?${params.toString()}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      timeout: 30000,
    });
    
    const { data } = response;
    
    if (!data) throw new Error("No data received from server");
    return data;
  } catch (error) {
    console.error('Service: Error ', error);
    
    const errorMessage = error.response?.data?.error || error.message || "Error obteniendo tickets del trabajador";
    throw new Error(errorMessage);
  }
}

const managerService = { 
  getWorkers, 
  getWorkerTickets 
};
export default managerService;