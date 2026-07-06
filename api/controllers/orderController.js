const Order = require("../models/Order");

// Create Order
const createOrder = async (req, res) => {

    try {

        const { customerName, email, address, items } = req.body;

        const order = await Order.create({

            user: req.user.id,

            customerName,

            email,

            address,

            items

        });

        res.status(201).json({
            message: "Order placed successfully!",
            order
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get Logged-in User Orders
const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            user: req.user.id
        });

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createOrder,
    getMyOrders
};