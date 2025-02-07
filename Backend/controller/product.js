const express = require("express");
const path = require("path");
const fs = require("fs");
const Product = require("../model/Product");
const { upload } = require("../multer");
const router = express.Router();

// 📌 Create Product API (Image Uploads + Save to MongoDB)
router.post("/create", upload.array("images", 5), async (req, res) => {
    try {
        const { name, description, price, stock, category, tags } = req.body;

        if (!name || !description || !price || !stock || !category || !req.files) {
            return res.status(400).json({ message: "All fields are required, including images." });
        }

        // Get image file paths
        const imagePaths = req.files.map((file) => path.join("uploads", file.filename));

        // Create Product in DB
        const newProduct = await Product.create({
            name,
            description,
            price,
            stock,
            category,
            tags: tags ? tags.split(",") : [],
            images: imagePaths,
        });

        res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
