import { CartItem } from './types';

const CART_STORAGE_KEY = 'ecom_cart';

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error getting cart from localStorage', error);
    return [];
  }
};

export const saveCart = (cart: CartItem[]) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage', error);
  }
};

export const addToCart = (item: CartItem) => {
  const cart = getCart();
  
  // Check if item already exists in cart (by product ID)
  const existingItemIndex = cart.findIndex(
    (cartItem) => typeof cartItem.product === 'string' 
      ? cartItem.product === item.product
      : cartItem.product._id === (typeof item.product === 'string' ? item.product : item.product._id)
  );

  if (existingItemIndex >= 0) {
    // Update quantity if item already in cart
    cart[existingItemIndex].quantity += item.quantity;
  } else {
    // Add new item to cart
    cart.push(item);
  }

  saveCart(cart);
  console.log('Updated cart:', cart); // Debug log
  return cart;
};

export const updateCartItemQuantity = (itemId: string, quantity: number) => {
  const cart = getCart();
  const itemIndex = cart.findIndex((item) => item._id === itemId);
  
  if (itemIndex >= 0) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart[itemIndex].quantity = quantity;
    }
    
    saveCart(cart);
  }
  
  return [...cart];
};

export const removeFromCart = (itemId: string) => {
  const cart = getCart().filter((item) => item._id !== itemId);
  saveCart(cart);
  return cart;
};

export const clearCart = () => {
  saveCart([]);
};

export const getCartTotal = (cart: CartItem[]) => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartItemCount = (cart: CartItem[]) => {
  return cart.reduce((count, item) => count + item.quantity, 0);
};
