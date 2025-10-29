export type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    countInStock: number;
};  

export type CartItem = {
    product: Product;
    quantity: number;
};

export type Order = {
    id: string;
    customerName: string;
    customerEmail: string;
    items: CartItem[];
    total: number;
    createdAt: Date;
};
