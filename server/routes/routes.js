const express = require('express');
const router = express.Router();
const stripe = require('../controllers/Stripe');
const AuthController = require("../controllers/AuthController");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, } = require("../controllers/verifyToken");
const CartController = require("../controllers/CartController");
const ProductController = require("../controllers/ProductController");


// Product API (ONLY ADMIN HAS ACCESS TO THIS ROUTES);
router.post('/api/v1/product/newproduct', ProductController.CreateNewProduct);
router.delete('/api/v1/product/delete/:productId', ProductController.deleteProductWithCorrespondingAllRelationship);
router.get('/api/v1/products', ProductController.getAllProducts);
router.get('/api/v1/product/:productId', ProductController.getOneProduct);
router.post('/search', ProductController.Search);

// Auth API
router.post('/api/v1/register', AuthController.CreateNewAccount);
router.post('/api/v1/login', AuthController.LoginUserAccount);

// Cart API
router.post('/api/v1/cart/new', verifyToken, CartController.CreateNewCart);
router.put('/api/v1/cart/update/:id', verifyTokenAndAuthorization, CartController.UpdateCart);
router.delete('/api/v1/cart/delete/:cartId', verifyTokenAndAuthorization, CartController.DeleteCart);
router.get('/api/v1/cart/:userid', verifyTokenAndAuthorization, CartController.GetSingleUserCart);
router.get('/api/v1/carts', verifyTokenAndAdmin, CartController.GetAllCarts);

// stripe API
router.post('/api/v1/payment/stripe', stripe.StripePayment);

module.exports = router;