// API client for making HTTP requests to our backend

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Fetches all products from the API
 * @returns {Promise<Array>} Array of products
 */
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetches a single product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Product details
 */
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

/**
 * Creates a new order
 * @param {Object} orderData - Order data including items, shipping info, etc.
 * @param {string} token - Authentication token (if required)
 * @returns {Promise<Object>} Created order
 */
export const createOrder = async (orderData, token = '') => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    // Add auth token if provided
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

/**
 * Fetches an order by ID
 * @param {string} orderId - Order ID
 * @param {string} token - Authentication token (if required)
 * @returns {Promise<Object>} Order details
 */
export const getOrderById = async (orderId, token = '') => {
  try {
    const headers = {};
    
    // Add auth token if provided
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/orders/${orderId}`, { headers });
    
    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    throw error;
  }
};
