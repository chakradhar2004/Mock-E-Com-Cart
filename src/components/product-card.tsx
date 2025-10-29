'use client';

import Image from 'next/image';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import { addToCartAction } from '@/lib/actions';
import { useActionState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

export function ProductCard({ product }: { product: Product }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(addToCartAction, null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.success) {
      toast({
        title: 'Added to cart',
        description: `${product.name} has been added to your cart.`,
      });
      formRef.current?.reset();
    }
    if (state?.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'destructive',
      });
    }
  }, [state, product.name, toast]);

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-4">
        <div className="aspect-square relative mb-4">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-md"
            data-ai-hint={product.imageHint}
          />
        </div>
        <CardTitle className="font-headline tracking-tight text-xl">{product.name}</CardTitle>
        <CardDescription className="text-primary font-bold text-2xl">{formatCurrency(product.price)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
      </CardContent>
      <CardFooter className="p-4 bg-muted/50">
        <form ref={formRef} action={formAction} className="flex w-full gap-2">
          <input type="hidden" name="productId" value={product.id} />
          <Input
            type="number"
            name="quantity"
            defaultValue={1}
            min={1}
            max={99}
            className="w-20"
            aria-label="Quantity"
          />
          <Button type="submit" className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
