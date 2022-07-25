const mongoose = require("mongoose");

const ProductImageSchema = new mongoose.Schema(
  {
    src: { type: String, required: true },
    alt: { type: String, required: true },
    
  }
);

module.exports = mongoose.model("ProductImage", ProductImageSchema);
