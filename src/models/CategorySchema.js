const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
    },
});

const Category = mongoose.model("Category", categorySchema);
