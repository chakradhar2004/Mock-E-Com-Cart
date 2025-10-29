'use client';

import { CheckoutForm } from "@/components/checkout-form";
import { formatCurrency } from "@/lib/utils";
import { CreditCard, ShoppingCart } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createOrder } from '@/lib/api/client';

type CartItem = {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
};

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (err) {
      console.error('Failed to load cart', err);
      setError('Failed to load your cart. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const total = cartItems.reduce((sum: number, item: CartItem) => sum + item.product.price * item.quantity, 0);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="flex flex-col items-center justify-center gap-4 py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="flex flex-col items-center justify-center gap-4 py-24">
          <p className="text-red-500">{error}</p>
          <Link href="/" className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                 <div className="flex flex-col items-center justify-center gap-4 py-24">
                    <ShoppingCart className="h-24 w-24 text-muted-foreground" />
                    <h1 className="text-2xl font-semibold">Your cart is empty</h1>
                    <p className="text-muted-foreground">Add some products to get started.</p>
                    <Link href="/" className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                        Go Shopping
                    </Link>
                </div>
            </div>
        )
    }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><CreditCard /> Billing Information</h2>
                <CheckoutForm />
            </div>
            <div>
                 <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                 <div className="space-y-4 rounded-lg border bg-card p-4">
                    {cartItems.map(item => (
                        <div key={item.product.id} className="flex items-center gap-4">
                             <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                                <Image
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                                data-ai-hint={item.product.imageHint}
                                />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold">{item.product.name}</p>
                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                             <p className="font-semibold">{formatCurrency(item.product.price * item.quantity)}</p>
                        </div>
                    ))}
                    <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{formatCurrency(total)}</span>
                    </div>
                 </div>
            </div>
        </div>
    </div>
  );
}
