import { CartItem } from "./types";

const CART_STORAGE_KEY = 'cart';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') {
        return [];
    }
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart: CartItem[]) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
}
