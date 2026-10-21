import axios from 'axios';
import type { Post, ApiResponse } from '@/types/post';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function handleResponse<T>(response: any): T {
  const { data } = response as { data: ApiResponse<T> };
  if (data.status === 'error') {
    // Validation errors may be in data.data
    const errMsg = (data as any).data?.error || data.message;
    throw new Error(errMsg);
  }
  return data.data;
}

export async function getPosts(limit: number, offset: number, status?: string): Promise<Post[]> {
  const params: any = { limit, offset };
  if (status) params.status = status;
  const response = await api.get(`/article/${limit}/${offset}`, { params });
  return handleResponse<Post[]>(response);
}

export async function getPostById(id: number): Promise<Post> {
  const response = await api.get(`/article/${id}`);
  return handleResponse<Post>(response);
}

export async function createPost(payload: Omit<Post, 'id' | 'created_date' | 'updated_date'>): Promise<Post> {
  const response = await api.post('/article/', payload);
  return handleResponse<Post>(response);
}

export async function updatePost(id: number, payload: Omit<Post, 'id' | 'created_date' | 'updated_date'>): Promise<Post> {
  const response = await api.put(`/article/${id}`, payload);
  return handleResponse<Post>(response);
}

export async function deletePost(id: number): Promise<void> {
  await api.delete(`/article/${id}`);
  // The API returns a success envelope; we ignore data.
}
