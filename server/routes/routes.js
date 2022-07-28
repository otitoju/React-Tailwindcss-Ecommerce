const express = require('express');
const router = express.Router();
const stripe = require('../controllers/Stripe');
const AuthController = require("../controllers/AuthController");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, } = require("../controllers/verifyToken");
const CartController = require("../controllers/CartController");
const ProductController = require("../controllers/ProductController");
const OrderController = require('../controllers/Order');
const UserController = require("../controllers/User");


// Product API (ONLY ADMIN HAS ACCESS TO THIS ROUTES);
router.post('/api/v1/product/newproduct', ProductController.CreateNewProduct);
router.delete('/api/v1/product/delete/:productId', ProductController.deleteProductWithCorrespondingAllRelationship);
router.get('/api/v1/products', ProductController.getAllProducts);
router.get('/api/v1/product/:productId', ProductController.getOneProduct);
router.post('/api/v1/product/search', ProductController.Search);
router.get('/api/v1/product/search/:key', ProductController.SearchQuery);
router.post('/api/v1/product/review/:productId', ProductController.AddReview);
router.post('/api/v1/product/color/:productId', ProductController.AddProductColor);
router.post('/api/v1/product/size/:productId', ProductController.AddProductSize);
router.post('/api/v1/product/image/:productId', ProductController.AddProductImage);
router.post('/api/v1/products/published', ProductController.getAllPublishedProducts);


// User API
router.get('/api/v1/users', UserController.getUsers);
router.get('/api/v1/user/:userId', UserController.getUser);
router.delete('/api/v1/user/:userId', UserController.deleteUser);
router.get('/api/v1/user/stats', UserController.getUserStatistic);

// Auth API
router.post('/api/v1/register', AuthController.CreateNewAccount);
router.post('/api/v1/login', AuthController.LoginUserAccount);

// Cart API
router.post('/api/v1/cart/new', verifyToken, CartController.CreateNewCart);
router.put('/api/v1/cart/update/:id', verifyTokenAndAuthorization, CartController.UpdateCart);
router.delete('/api/v1/cart/delete/:cartId', verifyTokenAndAuthorization, CartController.DeleteCart);
router.get('/api/v1/cart/:userid', verifyTokenAndAuthorization, CartController.GetSingleUserCart);
router.get('/api/v1/carts', verifyTokenAndAdmin, CartController.GetAllCarts);

// Stripe API
router.post('/api/v1/payment/stripe', stripe.StripePayment);
router.post('/api/v1/payment/create', stripe.StripeCheckout);

// Order API
router.post('/api/v1/order/neworder', OrderController.newOrder);
router.put('/api/v1/order/update/:orderId', OrderController.updateOrder);
router.delete('/api/v1/order/delete/:orderId', OrderController.deleteOrder);
router.get('/api/v1/order/user/find/:userId', OrderController.getUserOrder);
router.get('/api/v1/order/orders', OrderController.getAllOrders);
router.get('/api/v1/order/monthlyincome', OrderController.getMonthlyIncome);

module.exports = router;