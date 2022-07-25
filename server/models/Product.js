const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    preview_img: { type: String },
    images: { type: mongoose.SchemaTypes.ObjectId, ref: "ProductImage"},
    reviews: { type: mongoose.SchemaTypes.ObjectId, ref: "Review"},
    colors: { type: mongoose.SchemaTypes.ObjectId, ref: "ProductColor"},
    sizes: { type: mongoose.SchemaTypes.ObjectId, ref: "ProductSize"},
    category: { type: String, required: true },
    description: { type: String, required: true },
    highlights: [String],
    details: { type: String, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
// https://stackoverflow.com/questions/11904159/automatically-remove-referencing-objects-on-deletion-in-mongodb