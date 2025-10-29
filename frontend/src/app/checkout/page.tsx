'use client';

import { CheckoutForm } from "@/components/checkout-form";
import { formatCurrency } from "@/lib/utils";
import { CreditCard, ShoppingCart } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/cart-context';

export default function CheckoutPage() {
  const { cartItems, totalPrice } = useCart();

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
                                src={item.product.image}
                                alt={item.product.name}
                                fill
                                className="object-cover"
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
                        <span>{formatCurrency(totalPrice)}</span>
                    </div>
                 </div>
            </div>
        </div>
    </div>
  );
}
