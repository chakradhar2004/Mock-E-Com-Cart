import { Product, CartItem, Order, CartItemWithProduct } from './types';
import { unstable_noStore as noStore } from 'next/cache';
import { PlaceHolderImages } from './placeholder-images';

// --- MOCK DATABASE ---

const products: Product[] = [
  { id: '1', name: 'Minimalist Chair', price: 120.00, ...PlaceHolderImages.find(p => p.id === 'product-1')! },
  { id: '2', name: 'Wooden Desk', price: 250.50, ...PlaceHolderImages.find(p => p.id === 'product-2')! },
  { id: '3', name: 'Sleek Laptop', price: 1200.00, ...PlaceHolderImages.find(p => p.id === 'product-3')! },
  { id: '4', name: 'Ergonomic Mouse', price: 75.00, ...PlaceHolderImages.find(p => p.id === 'product-4')! },
  { id: '5', name: '4K Monitor', price: 450.99, ...PlaceHolderImages.find(p => p.id === 'product-5')! },
  { id: '6', name: 'Mechanical Keyboard', price: 150.00, ...PlaceHolderImages.find(p => p.id === 'product-6')! },
  { id: '7', name: 'Noise-Cancelling Headphones', price: 300.00, ...PlaceHolderImages.find(p => p.id === 'product-7')! },
  { id: '8', name: 'Smart Watch', price: 350.00, ...PlaceHolderImages.find(p => p.id === 'product-8')! },
];

let cart: CartItem[] = [];

let orders: Order[] = [];

// --- DATABASE FUNCTIONS ---

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getProducts(): Promise<Product[]> {
  await delay(500);
  return products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  await delay(100);
  return products.find(p => p.id === id);
}

export async function getCart(): Promise<CartItem[]> {
  noStore();
  await delay(100);
  return cart;
}

export async function getCartItemsWithProducts(): Promise<CartItemWithProduct[]> {
  noStore();
  await delay(200);
  const cartItems = await getCart();
  const itemsWithProducts = await Promise.all(
    cartItems.map(async (item) => {
      const product = await getProductById(item.productId);
      return { product: product!, quantity: item.quantity };
    })
  );
  return itemsWithProducts.filter(item => item.product);
}

export async function addToCart(productId: string, quantity: number) {
  noStore();
  await delay(200);
  const existingItem = cart.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  return cart;
}

export async function updateCartItemQuantity(productId: string, quantity: number) {
  noStore();
  await delay(100);
  const item = cart.find(item => item.productId === productId);
  if (item) {
    if (quantity > 0) {
      item.quantity = quantity;
    } else {
      cart = cart.filter(cartItem => cartItem.productId !== productId);
    }
  }
  return cart;
}

export async function removeFromCart(productId: string) {
  noStore();
  await delay(100);
  cart = cart.filter(item => item.productId !== productId);
  return cart;
}

export async function clearCart() {
  noStore();
  await delay(100);
  cart = [];
}

export async function createOrder(customerName: string, customerEmail: string): Promise<Order> {
  noStore();
  await delay(1000);
  const items = await getCartItemsWithProducts();
  if (items.length === 0) {
    throw new Error("Cannot create an order with an empty cart.");
  }
  
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const newOrder: Order = {
    id: `ord_${Date.now()}`,
    customerName,
    customerEmail,
    items,
    total,
    createdAt: new Date(),
  };
  orders.push(newOrder);
  await clearCart();
  return newOrder;
}

export async function getOrder(id: string): Promise<Order | undefined> {
  noStore();
  await delay(100);
  return orders.find(o => o.id === id);
}
