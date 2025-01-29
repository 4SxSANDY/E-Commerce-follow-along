
const express = require("express");
const path = require("path");
const User = require("../model/user"); // Make sure the path is correct
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");

// create user
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileurl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileurl,
    };

    console.log(user);
    // You'll likely want to save the user to the database here
    // Example: const newUser = await User.create(user);

  } catch (error) {
    return next(new ErrorHandler(error.message, 500)); // Handle errors properly
  }

});

module.exports = router;
