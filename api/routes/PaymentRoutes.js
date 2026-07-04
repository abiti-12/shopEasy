const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/chapa", async (req, res) => {

    try {

        const { amount, email, first_name, last_name } = req.body;
console.log(req.body);
console.log("Amount received:", amount, typeof amount);
        const response = await axios.post(

            "https://api.chapa.co/v1/transaction/initialize",

            {
                amount: String(amount),
                currency: "ETB",
                email,
                first_name,
                last_name,

                tx_ref: "TX-" + Date.now(),

                callback_url: "http://localhost:3000/payment-success",

                return_url: "http://localhost:3000/payment-success"

            },

            {
                headers: {
                    Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
                    "Content-Type": "application/json"
                }
            }

        );

        console.log("CHAPA RESPONSE:");
        console.log(response.data);

        res.json(response.data);

    } catch (error) {

        console.log("========== CHAPA ERROR ==========");

        if (error.response) {

            console.log(error.response.data);

            return res.status(500).json(error.response.data);

        }

        console.log(error.message);

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;