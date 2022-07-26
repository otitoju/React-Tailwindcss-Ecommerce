const User = require("../models/User");

class UserController {
    static async getUsers(req, res) {
        try {
            const query = req.query.new;
            const users = query
                ? await User.find().sort({ _id: -1 }).limit(5)
                : await User.find();
            return res.json({
                status: 200,
                message: "OK",
                users: users
            });
        } catch (error) {
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }

    static async getUser(req, res) {
        try {
            const { userId } = req.params;
            const user = await User.findOne({ "_id": userId });
            return res.json({
                status: 200,
                message: "OK",
                user: user
            });
        } catch (error) {
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }

    static async deleteUser(req, res) {
        try {
            const { userId } = req.params;
            const deletedUser = await User.findByIdAndDelete(userId);
            return res.json({
                status: 200,
                message: "OK",
                user: deletedUser
            });
        } catch (error) {
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }

    static async getUserStatistic(req, res) {
        try {
            const date = new Date();
            const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

            const data = await User.aggregate([
                { $match: { createdAt: { $gte: lastYear } } },
                {
                  $project: {
                    month: { $month: "$createdAt" },
                  },
                },
                {
                  $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                  },
                },
              ]);
            return res.json({
                status: 200,
                message: "OK",
                data: data
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

module.exports = UserController;