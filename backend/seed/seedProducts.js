const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

// Load environment variables
dotenv.config();

// Sample products data
const products = [
  {
    name: 'Wireless Earbuds',
    description: 'High-quality wireless earbuds with noise cancellation',
    price: 99.99,
    image: '/images/earbuds.jpg',
    category: 'Electronics',
    countInStock: 50,
    rating: 4.5,
    numReviews: 120,
  },
  {
    name: 'Smartphone X',
    description: 'Latest smartphone with advanced features',
    price: 699.99,
    image: '/images/smartphone.jpg',
    category: 'Electronics',
    countInStock: 30,
    rating: 4.8,
    numReviews: 89,
  },
  {
    name: 'Laptop Pro',
    description: 'High-performance laptop for professionals',
    price: 1299.99,
    image: '/images/laptop.jpg',
    category: 'Electronics',
    countInStock: 20,
    rating: 4.7,
    numReviews: 64,
  },
  {
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health monitoring',
    price: 199.99,
    image: '/images/smart watch.avif',
    category: 'Electronics',
    countInStock: 45,
    rating: 4.4,
    numReviews: 210,
  },
  {
    name: 'Wireless Headphones',
    description: 'Over-ear wireless headphones with deep bass',
    price: 149.99,
    image: '/images/headphones.jpg',
    category: 'Electronics',
    countInStock: 35,
    rating: 4.6,
    numReviews: 178,
  },
  {
    name: 'Ergonomic Office Chair',
    description: 'Comfortable ergonomic chair for long working hours',
    price: 249.99,
    image: '/images/chair.jpg',
    category: 'Furniture',
    countInStock: 15,
    rating: 4.8,
    numReviews: 92,
  },
  {
    name: '27-inch 4K Monitor',
    description: 'Ultra HD monitor with HDR and 144Hz refresh rate',
    price: 349.99,
    image: '/images/monitor.jpg',
    category: 'Electronics',
    countInStock: 25,
    rating: 4.7,
    numReviews: 134,
  },
  {
    name: 'Ceramic Coffee Mug',
    description: 'Premium ceramic mug with heat retention',
    price: 14.99,
    image: '/images/cup.jpg',
    category: 'Home',
    countInStock: 100,
    rating: 4.9,
    numReviews: 256,
  },
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Import products to database
const importData = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert sample products
    const createdProducts = await Product.insertMany(products);
    
    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Destroy data
const destroyData = async () => {
  try {
    await connectDB();
    
    // Clear all products
    await Product.deleteMany({});
    
    console.log('Data destroyed successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run the appropriate command
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
