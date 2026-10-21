// src/types/post.ts
export interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  status: 'publish' | 'draft' | 'trash';
  created_date: string;
  updated_date: string;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data: T;
}

export interface ValidationError {
  field: string;
  error: string;
}
