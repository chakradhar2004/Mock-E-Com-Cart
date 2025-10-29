import { Product, Order } from '../types';
import type { ApiResponse, PaginatedResponse } from './types';

export type { PaginatedResponse };

const API_BASE_URL = '/api';

// Helper function to handle responses
const handleResponse = async <T>(response: Response): Promise<T> => {
  const data: ApiResponse<T> = await response.json();
  
  if (!response.ok || !data.success) {
    const error = new Error(data.message || data.error || 'Something went wrong');
    (error as any).status = response.status;
    throw error;
  }
  
  return data.data as T;
};

// Fetch all products
export const getProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch products');
  }
  
  return {
    success: true,
    products: data.products || [],
    page: data.page || 1,
    pages: data.pages || 1,
    count: data.count || 0
  };
};

// Fetch single product by ID
export const getProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  return handleResponse<{ product: Product }>(response).then(data => (data as any).product);
};

// Create a new order
export const createOrder = async (orderData: Partial<Order>): Promise<Order> => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  return handleResponse<{ order: Order }>(response).then(data => (data as any).order);
};

// Get order by ID
export const getOrderById = async (id: string): Promise<Order> => {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`);
  return handleResponse<{ order: Order }>(response).then(data => (data as any).order);
};
