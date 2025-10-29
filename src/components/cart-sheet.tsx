'use client';

import { ShoppingCart, X } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from './ui/sheet';
import type { CartItemWithProduct } from '@/lib/types';
import { Separator } from './ui/separator';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import { CartItemCard } from './cart-item-card';

interface CartSheetProps {
  cartItems: CartItemWithProduct[];
  totalQuantity: number;
}

export function CartSheet({ cartItems, totalQuantity }: CartSheetProps) {
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {totalQuantity}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-4">
          <SheetTitle>Your Cart ({totalQuantity})</SheetTitle>
        </SheetHeader>
        <Separator />
        {cartItems.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col gap-4 p-4">
                {cartItems.map((item) => (
                  <CartItemCard key={item.product.id} item={item} />
                ))}
              </div>
            </div>
            <Separator />
            <SheetFooter className="p-4 space-y-4">
                <div className="flex w-full justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                </div>
                <SheetClose asChild>
                    <Button asChild size="lg" className="w-full">
                        <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>
                </SheetClose>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <ShoppingCart className="h-24 w-24 text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
