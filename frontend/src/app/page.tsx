import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/api/client';
import type { Product } from '@/lib/types';

interface ProductsResponse {
  success: boolean;
  products: Product[];
  page: number;
  pages: number;
  count: number;
}

export default async function Home() {
  try {
    const response = await getProducts();
    // Ensure the response has the expected structure
    const { products = [] } = Array.isArray(response) 
      ? { products: response } 
      : response as ProductsResponse;

    // Log detailed product data for debugging
    console.log('Products with stock info:', products.map(p => ({
      name: p.name,
      countInStock: p.countInStock,
      image: p.image
    })));
    
    // Map products to include image paths
    const productsWithImages = products.map(product => {
      // Create a map of keywords to image paths
      const keywordMap: [RegExp, string][] = [
        [/earbuds?/i, '/images/earbuds.jpg'],
        [/smartphone|phone/i, '/images/smartphone.jpg'],
        [/laptop|notebook/i, '/images/laptop.jpg'],
        [/smart[ -]?watch|watch/i, '/images/smart watch.avif'],
        [/headphones?|headset/i, '/images/headphones.jpg'],
        [/monitor|display/i, '/images/monitor.jpg'],
        [/chair|stool/i, '/images/chair.jpg'],
        [/cup|mug/i, '/images/cup.jpg']
      ];

      // Try to find a matching image based on product name
      let imagePath = '/images/placeholder.jpg';
      
      // Check for keyword matches
      for (const [pattern, path] of keywordMap) {
        if (pattern.test(product.name)) {
          imagePath = path;
          break;
        }
      }
      
      console.log(`Product: ${product.name} -> Image: ${imagePath}`);

      return {
        ...product,
        image: imagePath
      };
    });

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productsWithImages.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        <div className="text-center py-12">
          <p className="text-red-500">Error loading products. Please try again later.</p>
        </div>
      </div>
    );
  }
}
