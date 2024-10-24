const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
    name: String,
    location: String,
});
module.exports = mongoose.model("Branch", branchSchema);
