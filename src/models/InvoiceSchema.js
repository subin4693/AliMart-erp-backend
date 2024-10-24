const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
    {
        customername: {
            type: String,
            required: true,
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                quantity: Number,
                price: Number,
                total: Number,
            },
        ],
    },
    { timestamps: true }
);
module.exports = mongoose.model("Invoice", invoiceSchema);
