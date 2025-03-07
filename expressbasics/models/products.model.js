const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: String,
  price: Number,
});


module.exports = mongoose.model("Product", productSchema)