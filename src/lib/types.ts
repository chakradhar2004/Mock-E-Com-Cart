export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  imageHint: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CartItemWithProduct = {
  product: Product;
  quantity: number;
};

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  items: CartItemWithProduct[];
  total: number;
  createdAt: Date;
};
