'use client';

import { CartSheet } from './cart-sheet';
import Link from 'next/link';
import { Package } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Package className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline-block">Mock E-Com Cart</span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-end">
          <CartSheet />
        </div>
      </div>
    </header>
  );
}
