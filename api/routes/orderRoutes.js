const express = require("express");

const router = express.Router();

const {
    createOrder,
    getMyOrders
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

// Create Order
router.post("/", protect, createOrder);

// Get Logged-in User Orders
router.get("/my-orders", protect, getMyOrders);
module.exports = router;