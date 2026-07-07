const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {

        return res.status(401).json({
            message: "Not authorized"
        });

    }

    try {

        const token = authHeader.split(" ")[1];

        console.log("Received token:", token);

        const decoded = jwt.verify(token, "mysecretkey");

        console.log("Decoded token:", decoded);

        req.user = decoded;

        next();

    } catch (error) {

        console.log("JWT Error:", error);

        return res.status(401).json({
            message: "Invalid token"
        });

    }

};

module.exports = {
    protect
};