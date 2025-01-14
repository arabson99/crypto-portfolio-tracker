const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    coins: {
        type: [String]
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    UpdatedAt: {
        type: Date,
        default: () => Date.now(),
    }
})

module.exports = mongoose.model("portfolios", portfolioSchema)