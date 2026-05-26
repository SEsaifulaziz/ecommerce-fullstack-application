import { apiClient } from './client';

export async function loginUser(credentials) {
  const { data } = await apiClient.post('/api/v1/auth/login', credentials);
  return data;
}

export async function registerUser(payload) {
  const { data } = await apiClient.post('/api/v1/auth/register', payload);
  return data;
}
