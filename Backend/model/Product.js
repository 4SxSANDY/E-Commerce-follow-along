const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"],
    },
    stock: {
        type: Number,
        required: [true, "Stock is required"],
        min: [0, "Stock cannot be negative"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: ["Electronics", "Fashions", "Books", "Home Appliance"], 
    },
    tags: {
        type: [String], 
    },
    images: { 
        type: [String],
        required: true
    }, 

    createdAt: {
        type: Date,
        default: Date.now, 
    },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
