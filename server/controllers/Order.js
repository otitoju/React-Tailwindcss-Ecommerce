const Order = require("../models/Order");

class OrderController {
    static async newOrder(req, res) {
        try {
            const newOrder = await Order.create(req.body);
            return res.json({
                order: newOrder,
                status: 201
            });
        } catch (error) {
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }

    static async updateOrder(req, res) {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(
                req.params.orderId,
                {
                    $set: req.body,
                },
                { new: true }
            );
            return res.json({
                info: updatedOrder,
                message: "UPDATED",
                status: 201
            });
        } catch (error) {
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }

    static async deleteOrder(req, res) {
        try {
            const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
            return res.json({
                order: deletedOrder,
                status: 200,
                message: "DELETED"
            });
        } catch (error) {
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }

    static async getUserOrder(req, res) {
        try {
            const orders = await Order.find({ userId: req.params.userId });
            return res.json({
                order: orders,
                status: 200,
                message: "OK"
            });
        } catch (error) {
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }

    static async getAllOrders(req, res) {
        try {
            const orders = await Order.find();
            return res.json({
                order: orders,
                status: 200,
                message: "OK"
            });
        } catch (error) {
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }

    static async getMonthlyIncome(req, res) {
        try {
            const productId = req.query.pid;
            const date = new Date();
            const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
            const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

            const income = await Order.aggregate([
                {
                  $match: {
                    createdAt: { $gte: previousMonth },
                    ...(productId && {
                      products: { $elemMatch: { productId } },
                    }),
                  },
                },
                {
                  $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                  },
                },
                {
                  $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                  },
                },
              ]);
            return res.json({
                income: income,
                status: 200,
                message: "OK"
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

module.exports = OrderController;