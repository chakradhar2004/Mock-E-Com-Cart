import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/db';

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
