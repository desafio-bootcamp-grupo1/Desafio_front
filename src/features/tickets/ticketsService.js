// ticketsService.js
import { api } from "@/lib/api";
import { getAccessToken } from "@/lib/token";

export async function createGasolinerasTicket({ file, fecha }) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    if (fecha) {
      formData.append("fecha", fecha.toISOString());
    }

    const token = getAccessToken();
    const response = await api.post("/tickets/gasolineras", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      timeout: 120000,
    });
    
    const { data } = response;
    
    if (!data) throw new Error("No data received from server");
    
    return data;
  } catch (error) {
    console.error('❌ Service: Error completo:', error);
    
    const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
    throw new Error(errorMessage);
  }
}

export async function createPeajeTicket({ file, fecha }) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    if (fecha) {
      formData.append("fecha", fecha.toISOString());
    }

    const token = getAccessToken();
    const response = await api.post("/tickets/peaje", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      timeout: 120000,
    });
    
    const { data } = response;
    
    if (!data) throw new Error("No data received from server");
    
    return data;
  } catch (error) {
    console.error('❌ Service: Error completo:', error);
    
    const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
    throw new Error(errorMessage);
  }
}

export async function getUserTickets({ page = 1, limit = 20, domain, from, to }) {
  try {
    const token = getAccessToken();
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    if (domain) params.append('domain', domain);
    if (from) params.append('from', from);
    if (to) params.append('to', to);

    const response = await api.get(`/tickets/me?${params.toString()}`, {
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
    
    const errorMessage = error.response?.data?.error || error.message || "Error obteniendo tickets";
    throw new Error(errorMessage);
  }
}

export async function getTicketById(id) {
  try {
    const token = getAccessToken();
    const response = await api.get(`/tickets/${id}`, {
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
    
    const errorMessage = error.response?.data?.error || error.message || "Error obteniendo ticket";
    throw new Error(errorMessage);
  }
}

export async function getUserTicketsByUserId(userId, { page = 1, limit = 20, domain, from, to }) {
  try {
    const token = getAccessToken();
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    if (domain) params.append('domain', domain);
    if (from) params.append('from', from);
    if (to) params.append('to', to);

    const response = await api.get(`/tickets/${userId}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      timeout: 30000,
    });
    
    const { data } = response;
    
    if (!data) throw new Error("No data received from server");
    
    return data;
  } catch (error) {
    console.error('❌ Service: Error obteniendo tickets del usuario', error);
    
    const errorMessage = error.response?.data?.error || error.message || "Error obteniendo tickets del usuario";
    throw new Error(errorMessage);
  }
}



const ticketsService = { createGasolinerasTicket, createPeajeTicket, getUserTickets, getTicketById, getUserTicketsByUserId };
export default ticketsService;