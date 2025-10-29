const mongoose = require('mongoose');
const Product = require('./models/Product');

async function fixStock() {
  try {
    await mongoose.connect('mongodb://localhost:27017/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
    
    // Update all products
    const result = await Product.updateMany(
      {},
      { 
        $set: { 
          stock: 10,
          countInStock: 10 
        } 
      }
    );
    
    console.log('Updated products:', result);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixStock();