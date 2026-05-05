const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }

  return response.json();
}

export const api = {
  usuarios: {
    list: () => fetchApi<{ total: number; items: import('../types').Usuario[] }>('/usuarios'),
    get: (id: number) => fetchApi<import('../types').Usuario>(`/usuarios/${id}`),
    create: (data: import('../types').UsuarioCreate) =>
      fetchApi<import('../types').Usuario>('/usuarios', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: import('../types').UsuarioUpdate) =>
      fetchApi<import('../types').Usuario>(`/usuarios/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => fetchApi<{ id_usuario: number; eliminado: boolean }>(`/usuarios/${id}`, { method: 'DELETE' }),
  },

  animales: {
    list: () => fetchApi<{ total: number; items: import('../types').Animal[] }>('/animales'),
    get: (id: number) => fetchApi<import('../types').Animal>(`/animales/${id}`),
    create: (data: import('../types').AnimalCreate) =>
      fetchApi<import('../types').Animal>('/animales', { method: 'POST', body: JSON.stringify(data) }),
    createGato: (data: import('../types').AnimalCreate) =>
      fetchApi<import('../types').Animal>('/animales/gatos', { method: 'POST', body: JSON.stringify(data) }),
    createPerro: (data: import('../types').AnimalCreate) =>
      fetchApi<import('../types').Animal>('/animales/perros', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: import('../types').AnimalUpdate) =>
      fetchApi<import('../types').Animal>(`/animales/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => fetchApi<{ id: number; eliminado: boolean }>(`/animales/${id}`, { method: 'DELETE' }),
  },

  citas: {
    list: () => fetchApi<{ total: number; items: import('../types').Cita[] }>('/citas'),
    get: (id: number) => fetchApi<import('../types').Cita>(`/citas/${id}`),
    create: (data: import('../types').CitaCreate) =>
      fetchApi<import('../types').Cita>('/citas', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: import('../types').CitaUpdate) =>
      fetchApi<import('../types').Cita>(`/citas/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => fetchApi<{ id: number; eliminado: boolean }>(`/citas/${id}`, { method: 'DELETE' }),
  },

  consultas: {
    list: () => fetchApi<{ total: number; items: import('../types').Consulta[] }>('/consultas'),
    get: (id: number) => fetchApi<import('../types').Consulta>(`/consultas/${id}`),
    create: (data: import('../types').ConsultaCreate) =>
      fetchApi<import('../types').Consulta>('/consultas', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: import('../types').ConsultaUpdate) =>
      fetchApi<import('../types').Consulta>(`/consultas/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => fetchApi<{ id: number; eliminado: boolean }>(`/consultas/${id}`, { method: 'DELETE' }),
  },
};