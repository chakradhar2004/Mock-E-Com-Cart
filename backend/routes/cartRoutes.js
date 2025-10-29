const express = require('express');
const router = express.Router();

let cart = [];

// @desc    Get cart items
// @route   GET /api/cart
// @access  Public
router.get('/', (req, res) => {
  res.json({ cart, total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0) });
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Public
router.post('/', (req, res) => {
  const { productId, quantity } = req.body;
  const existingItem = cart.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity, price: req.body.price });
  }
  res.status(201).json(cart);
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Public
router.delete('/:id', (req, res) => {
  cart = cart.filter(item => item.productId !== req.params.id);
  res.json(cart);
});

module.exports = router;
