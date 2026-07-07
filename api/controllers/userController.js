const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ===============================
// Register User
// ===============================

const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({

            name,
            email,
            password: hashedPassword

        });

        res.status(201).json({

            message: "User registered successfully",

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin

            }

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ===============================
// Login User
// ===============================

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({

                message: "Invalid email or password"

            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({

                message: "Invalid email or password"

            });

        }

        const token = jwt.sign(

            { id: user._id },

            "mysecretkey",

            { expiresIn: "1d" }

        );

        res.json({

            message: "Login successful",

            token,

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin

            }

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ===============================
// Export
// ===============================

module.exports = {

    registerUser,
    loginUser

};