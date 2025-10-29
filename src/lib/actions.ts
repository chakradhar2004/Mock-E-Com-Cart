'use server';

import { revalidatePath } from 'next/cache';
import { addToCart, createOrder, removeFromCart, updateCartItemQuantity } from './db';
import { z } from 'zod';
import { redirect } from 'next/navigation';

export async function addToCartAction(formData: FormData) {
  const schema = z.object({
    productId: z.string(),
    quantity: z.coerce.number().min(1),
  });

  const parseResult = schema.safeParse({
    productId: formData.get('productId'),
    quantity: formData.get('quantity'),
  });

  if (!parseResult.success) {
    return { error: 'Invalid input.' };
  }

  const { productId, quantity } = parseResult.data;

  try {
    await addToCart(productId, quantity);
    revalidatePath('/');
    revalidatePath('/checkout');
    return { success: true };
  } catch (e) {
    return { error: 'Failed to add item to cart.' };
  }
}

export async function updateCartItemQuantityAction(_prevState: any, formData: FormData) {
    const schema = z.object({
        productId: z.string(),
        quantity: z.coerce.number(),
        intent: z.string(),
    });
    
    const parseResult = schema.safeParse({
        productId: formData.get('productId'),
        quantity: formData.get('quantity'),
        intent: formData.get('intent')
    });

    if (!parseResult.success) {
      return { error: 'Invalid input.' };
    }

    const { productId, quantity, intent } = parseResult.data;
    
    const newQuantity = intent === 'increment' ? quantity + 1 : quantity - 1;

    try {
        await updateCartItemQuantity(productId, newQuantity);
        revalidatePath('/');
        revalidatePath('/checkout');
        return { success: true };
    } catch (e) {
        return { error: 'Failed to update quantity.' };
    }
}


export async function removeCartItemAction(_prevState: any, formData: FormData) {
    const schema = z.object({
        productId: z.string()
    });
    const parseResult = schema.safeParse({
        productId: formData.get('productId'),
    });

    if (!parseResult.success) {
        return { error: 'Invalid product ID.' };
    }
    
    try {
        await removeFromCart(parseResult.data.productId);
        revalidatePath('/');
        revalidatePath('/checkout');
        return { success: true };
    } catch (e) {
        return { error: 'Failed to remove item.' };
    }
}

export async function placeOrderAction(_prevState: any, formData: FormData) {
    const schema = z.object({
        name: z.string().min(2, "Name is too short"),
        email: z.string().email("Invalid email address"),
    });

    const parseResult = schema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
    });

    if (!parseResult.success) {
        return { errors: parseResult.error.flatten().fieldErrors };
    }

    const { name, email } = parseResult.data;

    try {
        const order = await createOrder(name, email);
        if(!order) {
            return { error: 'Failed to create order. Your cart might be empty.' };
        }
        revalidatePath('/');
        revalidatePath('/checkout');
        redirect(`/checkout/success?orderId=${order.id}`);

    } catch (e) {
        return { error: e instanceof Error ? e.message : 'An unknown error occurred.' };
    }
}
