'use client';

import { useState, FormEvent } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { createOrder } from '@/lib/api/client';
import { useRouter } from 'next/navigation';

type FormData = {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: string;
};

type FormErrors = {
  [key: string]: string[];
};

export function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const formValues: FormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      postalCode: formData.get('postalCode') as string,
      country: formData.get('country') as string,
      paymentMethod: formData.get('paymentMethod') as string || 'credit_card',
    };

    try {
      // Get cart items from localStorage
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      
      if (cartItems.length === 0) {
        throw new Error('Your cart is empty');
      }

      // Calculate order total
      const itemsPrice = cartItems.reduce(
        (sum: number, item: any) => sum + item.product.price * item.quantity,
        0
      );
      
      // For now, we'll set shipping and tax to 0
      const shippingPrice = 0;
      const taxPrice = 0;
      const totalPrice = itemsPrice + shippingPrice + taxPrice;

      // Prepare order data
      const orderData = {
        orderItems: cartItems.map((item: any) => ({
          product: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          image: item.product.imageUrl,
        })),
        shippingAddress: {
          address: formValues.address,
          city: formValues.city,
          postalCode: formValues.postalCode,
          country: formValues.country,
        },
        paymentMethod: formValues.paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      };

      // Create order
      const order = await createOrder(orderData);
      
      // Clear cart
      localStorage.removeItem('cart');
      
      // Redirect to success page
      router.push(`/checkout/success?orderId=${order._id}`);
      
    } catch (error: any) {
      console.error('Order submission failed:', error);
      
      if (error.response?.data?.errors) {
        // Handle validation errors from the server
        setErrors(error.response.data.errors);
      } else {
        // Show generic error message
        toast({
          title: 'Error',
          description: error.message || 'Failed to place order. Please try again.',
          variant: 'destructive',
        });
      }
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
                        {errors.name && <p className="text-sm text-destructive">{errors.name.join(', ')}</p>}
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
                        {errors.email && <p className="text-sm text-destructive">{errors.email.join(', ')}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                            id="address" 
                            name="address" 
                            placeholder="123 Main St" 
                            required 
                            disabled={isSubmitting}
                        />
                        {errors.address && <p className="text-sm text-destructive">{errors.address.join(', ')}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input 
                                id="city" 
                                name="city" 
                                placeholder="New York" 
                                required 
                                disabled={isSubmitting}
                            />
                            {errors.city && <p className="text-sm text-destructive">{errors.city.join(', ')}</p>}
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="postalCode">Postal Code</Label>
                            <Input 
                                id="postalCode" 
                                name="postalCode" 
                                placeholder="10001" 
                                required 
                                disabled={isSubmitting}
                            />
                            {errors.postalCode && <p className="text-sm text-destructive">{errors.postalCode.join(', ')}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input 
                            id="country" 
                            name="country" 
                            placeholder="United States" 
                            required 
                            disabled={isSubmitting}
                        />
                        {errors.country && <p className="text-sm text-destructive">{errors.country.join(', ')}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Payment Method</Label>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Input 
                                    type="radio" 
                                    id="creditCard" 
                                    name="paymentMethod" 
                                    value="credit_card" 
                                    defaultChecked 
                                    className="w-4 h-4"
                                    disabled={isSubmitting}
                                />
                                <Label htmlFor="creditCard" className="font-normal">Credit Card</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input 
                                    type="radio" 
                                    id="paypal" 
                                    name="paymentMethod" 
                                    value="paypal" 
                                    className="w-4 h-4"
                                    disabled={isSubmitting}
                                />
                                <Label htmlFor="paypal" className="font-normal">PayPal</Label>
                            </div>
                        </div>
                        {errors.paymentMethod && <p className="text-sm text-destructive">{errors.paymentMethod.join(', ')}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button 
                        type="submit" 
                        className="w-full" 
                        size="lg"
                        disabled={isSubmitting}
                    >
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Place Order
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
