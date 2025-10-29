'use client';

import Image from 'next/image';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useCart } from '@/lib/cart-context';

export function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    
    addToCart(product, quantity);
    
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
    
    // Reset quantity
    setQuantity(1);
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-4">
        <div className="aspect-square relative mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <CardTitle className="font-headline tracking-tight text-xl">{product.name}</CardTitle>
        <CardDescription className="text-primary font-bold text-2xl">
          {formatCurrency(product.price)}
          {product.countInStock === 0 && (
            <span className="text-sm text-red-500 ml-2">Out of Stock</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
      </CardContent>
      <CardFooter className="mt-auto p-4 pt-0">
        <form onSubmit={handleAddToCart} className="w-full">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max={product.countInStock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="flex h-10 w-20 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={product.countInStock === 0}
            />
            <Button 
              type="submit" 
              className="flex-1"
              disabled={product.countInStock === 0}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
