
import { Product, CartItem, Order, CartItemWithProduct } from './types';
import { unstable_noStore as noStore } from 'next/cache';
import { PlaceHolderImages } from './placeholder-images';

// --- MOCK DATABASE ---

// Using a global symbol to ensure the mock data is persistent across requests in a dev environment.
const globalForDb = global as unknown as { 
  products: Product[], 
  cart: CartItem[], 
  orders: Order[] 
};

const productsDb = globalForDb.products ?? (globalForDb.products = [
      { id: '1', name: 'Chair', price: 120.00, ...PlaceHolderImages.find(p => p.id === 'product-1')! },
      { id: '2', name: 'Wooden Desk', price: 250.50, ...PlaceHolderImages.find(p => p.id === 'product-2')! },
      { id: '3', name: 'Laptop', price: 1200.00, ...PlaceHolderImages.find(p => p.id === 'product-3')! },
      { id: '4', name: 'Mouse', price: 75.00, ...PlaceHolderImages.find(p => p.id === 'product-4')! },
      { id: '5', name: 'Monitor', price: 450.99, ...PlaceHolderImages.find(p => p.id === 'product-5')! },
      { id: '6', name: 'Keyboard', price: 150.00, ...PlaceHolderImages.find(p => p.id === 'product-6')! },
      { id: '7', name: 'Headphones', price: 300.00, ...PlaceHolderImages.find(p => p.id === 'product-7')! },
      { id: '8', name: 'Smart Watch', price: 350.00, ...PlaceHolderImages.find(p => p.id === 'product-8')! },
    ]);

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

export async function getCartItemsWithProducts(): Promise<CartItemWithProduct[]> {
  noStore();
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
  const existingItem = cartDb.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartDb.push({ productId, quantity });
  }
  return cartDb;
}

export async function updateCartItemQuantity(productId: string, quantity: number) {
  noStore();
  const itemIndex = cartDb.findIndex(item => item.productId === productId);
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
  const itemIndex = cartDb.findIndex(item => item.productId === productId);
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
    ordersDb.push(newOrder);
    await clearCart();
    return newOrder;
  }

export async function getOrder(id: string): Promise<Order | undefined> {
  noStore();
  return ordersDb.find(o => o.id === id);
}
