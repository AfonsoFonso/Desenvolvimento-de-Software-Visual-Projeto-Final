import type { User, Media, Review, LoginRequest, LoginResponse } from '@/types';

const API_BASE_URL = 'http://localhost:5000';

// Users
export const userApi = {
  list: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users/listar`);
    if (!response.ok) throw new Error('Erro ao listar usuários');
    return response.json();
  },

  register: async (data: { name: string; email: string; password: string }): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/registrar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0] || 'Erro ao registrar usuário');
    }
    return response.json();
  },

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao fazer login');
    }
    return response.json();
  },

  update: async (id: number, data: Partial<User>): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/atualizar/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao atualizar usuário');
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/users/delete/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar usuário');
  },
};

// Media
export const mediaApi = {
  list: async (): Promise<Media[]> => {
    const response = await fetch(`${API_BASE_URL}/media/listar`);
    if (!response.ok) throw new Error('Erro ao listar mídias');
    return response.json();
  },

  getById: async (id: number): Promise<Media> => {
    const response = await fetch(`${API_BASE_URL}/media/pesquisar/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar mídia');
    return response.json();
  },

  create: async (data: { title: string; description: string; userId: number }): Promise<Media> => {
    const response = await fetch(`${API_BASE_URL}/media/criar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0] || 'Erro ao criar mídia');
    }
    return response.json();
  },

  update: async (id: number, data: { title?: string; description?: string }): Promise<Media> => {
    const response = await fetch(`${API_BASE_URL}/media/atualizar/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao atualizar mídia');
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/media/remover/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar mídia');
  },
};

// Reviews
export const reviewApi = {
  list: async (): Promise<Review[]> => {
    const response = await fetch(`${API_BASE_URL}/reviews/listar`);
    if (!response.ok) throw new Error('Erro ao listar avaliações');
    return response.json();
  },

  getById: async (id: number): Promise<Review> => {
    const response = await fetch(`${API_BASE_URL}/reviews/pesquisar/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar avaliação');
    return response.json();
  },

  getByMedia: async (mediaId: number) => {
    const response = await fetch(`${API_BASE_URL}/reviews/media/${mediaId}`);
    if (!response.ok) throw new Error('Erro ao buscar avaliações da mídia');
    return response.json();
  },

  getByUser: async (userId: number): Promise<Review[]> => {
    const response = await fetch(`${API_BASE_URL}/reviews/usuario/${userId}`);
    if (!response.ok) throw new Error('Erro ao buscar avaliações do usuário');
    return response.json();
  },

  create: async (data: { rating: number; comment: string; userId: number; mediaId: number }): Promise<Review> => {
    const response = await fetch(`${API_BASE_URL}/reviews/criar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0] || 'Erro ao criar avaliação');
    }
    return response.json();
  },

  update: async (id: number, data: { rating: number; comment?: string }): Promise<Review> => {
    const response = await fetch(`${API_BASE_URL}/reviews/atualizar/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao atualizar avaliação');
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/reviews/remover/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar avaliação');
  },
};
