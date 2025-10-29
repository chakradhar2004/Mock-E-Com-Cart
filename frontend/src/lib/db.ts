
import { Product, CartItem, Order } from './types';
import { unstable_noStore as noStore } from 'next/cache';
import { PlaceHolderImages } from './placeholder-images';

// --- MOCK DATABASE ---

// Using a global symbol to ensure the mock data is persistent across requests in a dev environment.
const globalForDb = global as unknown as { 
  products: Product[], 
  cart: CartItem[], 
  orders: Order[] 
};

const productsDb = globalForDb.products ?? (globalForDb.products = PlaceHolderImages.map((p, i) => ({
    id: (i + 1).toString(),
    name: p.description,
    price: Math.floor(Math.random() * 100) + 20,
    image: p.image,
    countInStock: Math.floor(Math.random() * 20) + 1, // Add countInStock
})));

const cartDb = globalForDb.cart ?? (globalForDb.cart = []);
const ordersDb = globalForDb.orders ?? (globalForDb.orders = []);


// --- DATABASE FUNCTIONS ---

export async function getProducts(): Promise<Product[]> {
  return productsDb;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return productsDb.find(p => p.id === id);
}

export async function getCart(): Promise<CartItem[]> {
  noStore();
  return cartDb;
}

export async function addToCart(productId: string, quantity: number) {
  noStore();
  const product = await getProductById(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  
  const existingItem = cartDb.find(item => item.product.id === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartDb.push({ product, quantity });
  }
  return cartDb;
}

export async function updateCartItemQuantity(productId: string, quantity: number) {
  noStore();
  const itemIndex = cartDb.findIndex(item => item.product.id === productId);
  if (itemIndex > -1) {
    if (quantity > 0) {
      cartDb[itemIndex].quantity = quantity;
    } else {
      cartDb.splice(itemIndex, 1);
    }
  }
  return cartDb;
}

export async function removeFromCart(productId: string) {
  noStore();
  const itemIndex = cartDb.findIndex(item => item.product.id === productId);
  if (itemIndex > -1) {
    cartDb.splice(itemIndex, 1);
  }
  return cartDb;
}

export async function clearCart() {
  noStore();
  cartDb.length = 0;
}

export async function createOrder(customerName: string, customerEmail: string): Promise<Order | null> {
    noStore();
    const currentCart = await getCart();
    if (currentCart.length === 0) {
      return null;
    }
    
    const total = currentCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      customerName,
      customerEmail,
      items: currentCart,
      total,
      createdAt: new Date(),
    };
    ordersDb.push(newOrder);
    await clearCart();
    return newOrder;
  }

export async function getOrder(id: string): Promise<Order | undefined> {
  noStore();
  return ordersDb.find(o => o.id === id);
}
