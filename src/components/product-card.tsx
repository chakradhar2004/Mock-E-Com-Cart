import Image from 'next/image';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';
import { Plus, ShoppingCart } from 'lucide-react';
import { addToCartAction } from '@/lib/actions';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="font-headline tracking-tight">{product.name}</CardTitle>
        <CardDescription className="text-primary font-semibold text-lg">{formatCurrency(product.price)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <div className="aspect-square relative">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={product.imageHint}
            />
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-slate-50 dark:bg-slate-900">
        <form action={addToCartAction} className="flex w-full gap-2">
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
