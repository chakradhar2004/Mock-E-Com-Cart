'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Minus, Plus, Trash2, Loader2 } from 'lucide-react';
import type { CartItemWithProduct } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { useFormStatus } from 'react-dom';
import { removeCartItemAction, updateCartItemQuantityAction } from '@/lib/actions';
import { useEffect, useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton({ children, variant, size }: { children: React.ReactNode; variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined, size?: "default" | "sm" | "lg" | "icon" | null | undefined }) {
  const { pending } = useFormStatus();
  return (
    <Button variant={variant} size={size} type="submit" disabled={pending} aria-disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </Button>
  );
}

export function CartItemCard({ item }: { item: CartItemWithProduct }) {
  const { toast } = useToast();
  
  const [updateState, updateAction] = useActionState(updateCartItemQuantityAction, null);
  const [removeState, removeAction] = useActionState(removeCartItemAction, null);

  useEffect(() => {
    if (updateState?.error) {
      toast({ title: "Error", description: updateState.error, variant: 'destructive' });
    }
    if (removeState?.error) {
        toast({ title: "Error", description: removeState.error, variant: 'destructive' });
    }
  }, [updateState, removeState, toast]);

  const quantity = item.quantity;

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
            <form action={updateAction} className="flex items-center gap-2">
                <input type="hidden" name="productId" value={item.product.id} />
                <Button variant="outline" size="icon" type="submit" name="intent" value="decrement" disabled={useFormStatus().pending}>
                    {useFormStatus().pending && useFormStatus().data?.get('intent') === 'decrement' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Minus className="h-4 w-4" />}
                </Button>
                <Input
                    type="number"
                    name="quantity"
                    value={quantity}
                    className="h-9 w-14 text-center"
                    readOnly
                />
                <Button variant="outline" size="icon" type="submit" name="intent" value="increment" disabled={useFormStatus().pending}>
                    {useFormStatus().pending && useFormStatus().data?.get('intent') === 'increment' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                </Button>
            </form>
            <form action={removeAction}>
                 <input type="hidden" name="productId" value={item.product.id} />
                 <SubmitButton variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-red-500" />
                 </SubmitButton>
            </form>
        </div>
      </div>
       <div className="font-semibold">{formatCurrency(item.product.price * quantity)}</div>
    </div>
  );
}
