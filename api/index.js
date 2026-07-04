const express = require("express");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// ==============================
// Check Environment Variables
// ==============================

console.log("CHAPA KEY:", process.env.CHAPA_SECRET_KEY);

// ==============================
// Connect Database
// ==============================

connectDB();

// ==============================
// Middleware
// ==============================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));

// ==============================
// API Routes
// ==============================

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);
app.use("/payment", paymentRoutes);

// ==============================
// Pages
// ==============================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/register.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
});

app.get("/cart", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/cart.html"));
});

app.get("/checkout", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/checkout.html"));
});

app.get("/my-orders", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/my-orders.html"));
});

app.get("/product/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/product.html"));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/admin.html"));
});
app.get("/payment-success", (req, res) => {

    res.sendFile(path.join(__dirname, "../views/payment-success.html"));

});
// ==============================
// Start Server
// ==============================

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});