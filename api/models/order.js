const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
    customerName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    items: [
        {
            id: String,
            name: String,
            price: Number
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }

    

});

module.exports = mongoose.model("Order", orderSchema);