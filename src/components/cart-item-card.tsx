'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Minus, Plus, Trash2, Loader2 } from 'lucide-react';
import type { CartItemWithProduct } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { removeCartItemAction, updateCartItemQuantityAction } from '@/lib/actions';
import { useActionState, useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';


export function CartItemCard({ item }: { item: CartItemWithProduct }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleQuantityChange = (intent: 'increment' | 'decrement') => {
    startTransition(async () => {
        const formData = new FormData();
        formData.append('productId', item.product.id);
        formData.append('quantity', item.quantity.toString());
        formData.append('intent', intent);
        const result = await updateCartItemQuantityAction(null, formData);
        if (result?.error) {
            toast({ title: "Error", description: result.error, variant: 'destructive' });
        }
    });
  }

  const handleRemove = () => {
    startTransition(async () => {
        const formData = new FormData();
        formData.append('productId', item.product.id);
        const result = await removeCartItemAction(null, formData);
        if (result?.error) {
            toast({ title: "Error", description: result.error, variant: 'destructive' });
        }
    });
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
        <Image
          src={item.product.imageUrl}
          alt={item.product.name}
          fill
          className="object-cover"
          data-ai-hint={item.product.imageHint}
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{item.product.name}</h3>
        <p className="text-sm text-muted-foreground">{formatCurrency(item.product.price)}</p>
        <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange('decrement')} disabled={isPending}>
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Minus className="h-4 w-4" />}
                </Button>
                <Input
                    type="number"
                    value={item.quantity}
                    className="h-9 w-14 text-center"
                    readOnly
                />
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange('increment')} disabled={isPending}>
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                </Button>
            </div>
            <Button variant="ghost" size="icon" onClick={handleRemove} disabled={isPending}>
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 text-destructive" />}
            </Button>
        </div>
      </div>
       <div className="font-semibold">{formatCurrency(item.product.price * item.quantity)}</div>
    </div>
  );
}
