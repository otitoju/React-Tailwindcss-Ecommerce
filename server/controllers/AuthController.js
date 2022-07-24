const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
    static async CreateNewAccount(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.json({
                    status: 400,
                    message: "NOT_ALLOWED"
                });
            }
            else {
                const hashedPassword = bcrypt.hashSync(password, 10);
                const newUser = await User.create(req.body);
                newUser.password = hashedPassword;
                await newUser.save();
                return res.json({
                    status: 201,
                    message: "CREATED"
                });
            }
        } catch (error) {
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }

    static async LoginUserAccount(req, res) {
        try {
            const { email, password } = req.body;
            if(!email || !password) {
                return res.json({
                    status: 400,
                    message: "NOT_ALLOWED"
                });
            }
            else {
                const user = await User.findOne({ email: email });
                
                if(!user) {
                    return res.json({
                        status: 401,
                        message: "UNAUTHORIZED_OR_BAD_CREDENTIALS1"
                    });
                }
                else {
                    const IsCorrectPassword = bcrypt.compareSync(password, user.password);

                    if(!IsCorrectPassword) {
                        return res.json({
                            status: 401,
                            message: "UNAUTHORIZED_OR_BAD_CREDENTIALS2"
                        })
                    }
                    else {
                        const accessToken = jwt.sign(
                            {
                                id: user._id,
                                isAdmin: user.isAdmin,
                            },
                            process.env.JWT_SEC,
                            { expiresIn: "3d" }
                        );
                        return res.json({
                            status: 200,
                            message: "AUTHORIZED",
                            accessToken: accessToken
                        });
                    }
                }
            }

        } catch (error) {
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }
}

module.exports = AuthController;