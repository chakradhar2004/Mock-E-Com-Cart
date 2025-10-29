'use client';

import { useState, FormEvent } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';

export function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { cartItems, totalPrice, clearCart } = useCart();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    try {
      if (cartItems.length === 0) {
        throw new Error('Your cart is empty');
      }

      // Mock checkout
      const receipt = {
        total: totalPrice,
        timestamp: new Date(),
      };

      // Clear cart
      clearCart();

      // Redirect to success page
      router.push(`/checkout/success?receipt=${JSON.stringify(receipt)}`);
      
    } catch (error: any) {
      console.error('Checkout failed:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to checkout. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="John Doe" 
              required 
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="john.doe@example.com" 
              required 
              disabled={isSubmitting}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={isSubmitting || cartItems.length === 0}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Place Order
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
