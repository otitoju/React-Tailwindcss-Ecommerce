const mongoose = require("mongoose");

const ProductColor = new mongoose.Schema(
  {
    name: { type: String, required: true },
    class: { type: String, required: true },
    selectedClass: { type: String }
  }
);

module.exports = mongoose.model("ProductColor", ProductColor);
