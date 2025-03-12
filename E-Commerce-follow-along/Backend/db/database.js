const mongoose = require("mongoose");
require("dotenv").config();
const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB Connected Successfully ✅");
    })
    .catch((err) => {
      console.log(`MongoDB Connection Failed ❌: ${err.message}`);
      process.exit(1);
    });
  
};

module.exports = connectDatabase;