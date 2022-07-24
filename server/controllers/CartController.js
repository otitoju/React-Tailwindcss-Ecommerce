const Cart = require("../models/Cart");

class CartController {
    static async CreateNewCart(req, res) {
        try {
            const newCart = await Cart.create(req.body);
            return res.json({
                status: 201,
                message: "CREATED",
                cart: newCart
            });
        } catch (error) {
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }

    static async UpdateCart(req, res) {
        try {
            const updatedCart = await Cart.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );

            return res.json({
                status: 200,
                message: "OK",
                info: updatedCart
            });
        } catch (error) {
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }

    static async DeleteCart(req, res) {
        try {
            const { cartId } = req.params;
            const info = await Cart.findOneAndDelete({ _id: cartId });
            return res.json({
                status: 200,
                message: "DELETED",
                info: info
            })
        } catch (error) {
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }

    static async GetSingleUserCart(req, res) {
        try {
            const cart = await Cart.findOne({ userId: req.params.userId });
            return res.json({
                status: 200,
                message: "OK",
                cart: cart
            });
        } catch (error) {
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }

    static async GetAllCarts(req, res) {
        try {
            const carts = await Cart.find();
            return res.json({
                status: 200,
                message: "OK",
                carts: carts
            });
        } catch (error) {
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }
}

module.exports = CartController;