const mongoose = require('mongoose');
const Product = require('./models/Product');

async function updateStock() {
  try {
    await mongoose.connect('mongodb://localhost:27017/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Update all products to have stock of 10
    const result = await Product.updateMany(
      {},
      { $set: { stock: 10 } }
    );

    console.log('Updated stock for all products:', result);
    
    // Verify the update
    const products = await Product.find({});
    console.log('Updated products:');
    products.forEach(p => console.log(`${p.name}: ${p.stock} in stock`));
    
    process.exit(0);
  } catch (error) {
    console.error('Error updating stock:', error);
    process.exit(1);
  }
}

updateStock();
