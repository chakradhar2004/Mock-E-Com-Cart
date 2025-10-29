import { CheckCircle } from "lucide-react";
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto flex items-center justify-center py-24">
        <div className="flex flex-col items-center text-center gap-6">
            <CheckCircle className="h-24 w-24 text-green-500" />
            <h1 className="text-4xl font-extrabold tracking-tight">Order Placed</h1>
            <Link href="/" className="mt-6 px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-lg font-semibold">
                Go Shopping
            </Link>
        </div>
    </div>
  );
}
