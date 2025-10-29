export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  countInStock: number;
  rating: number;
  numReviews: number;
  createdAt: string;
  updatedAt: string;
};

export type CartItem = {
  _id: string;
  product: string | Product;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export type OrderItem = {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: string;
};

export type Order = {
  _id: string;
  user: string;
  orderItems: OrderItem[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
};
