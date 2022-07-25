const mongoose = require("mongoose");

const ProductSize = new mongoose.Schema(
  {
    name: { type: String, required: true },
    inStock: { type: Boolean, default: true },
  }
);

module.exports = mongoose.model("ProductSize", ProductSize);
