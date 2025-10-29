import { getOrder } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle, Package } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { orderId: string };
}) {
  const { orderId } = searchParams;
  const order = await getOrder(orderId);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Order not found</h1>
        <p className="text-muted-foreground">The requested order could not be found.</p>
        <Link href="/" className="mt-4 inline-block px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Go to homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
        <div className="flex flex-col items-center text-center">
            <CheckCircle className="h-20 w-20 text-green-500" />
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-primary">Thank you for your order!</h1>
            <p className="mt-2 text-lg text-muted-foreground">Your order has been placed successfully.</p>
            <p className="text-sm text-muted-foreground">Order ID: {order.id}</p>
        </div>
        
        <div className="mt-12 rounded-lg border bg-card shadow-sm">
            <div className="p-6">
                <h2 className="text-xl font-semibold">Order Receipt</h2>
                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                        <p className="font-medium">Customer</p>
                        <p className="text-muted-foreground">{order.customerName}</p>
                        <p className="text-muted-foreground">{order.customerEmail}</p>
                    </div>
                     <div className="text-right">
                        <p className="font-medium">Order Date</p>
                        <p className="text-muted-foreground">{order.createdAt.toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
            <div className="border-t p-6 space-y-4">
                <h3 className="font-semibold">Items</h3>
                 {order.items.map(item => (
                    <div key={item.product.id} className="flex items-center gap-4">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                            <Image
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            data-ai-hint={item.product.imageHint}
                            />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                            <p className="font-medium">{formatCurrency(item.product.price * item.quantity)}</p>
                    </div>
                ))}
            </div>
            <div className="border-t bg-muted/50 p-6 flex justify-between font-bold text-lg">
                <span>Total Paid</span>
                <span>{formatCurrency(order.total)}</span>
            </div>
        </div>
         <div className="mt-8 text-center">
            <Link href="/" className="px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Continue Shopping
            </Link>
        </div>
    </div>
  );
}
