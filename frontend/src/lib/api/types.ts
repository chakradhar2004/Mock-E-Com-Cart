import { Product } from '../types';

export interface PaginatedResponse<T> {
  success: boolean;
  products: T[];
  page: number;
  pages: number;
  count: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
