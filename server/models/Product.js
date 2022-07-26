const mongoose = require("mongoose");
const ProductImage = require("./ProductImage");
const Review = require("./Review");
const ProductColor = require("./ProductColor");
const ProductSize = require("./ProductSize");


const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    preview_img: { type: String },
    images: { type: mongoose.SchemaTypes.ObjectId, ref: "ProductImage" },
    reviews: { type: mongoose.SchemaTypes.ObjectId, ref: "Review" },
    colors: { type: mongoose.SchemaTypes.ObjectId, ref: "ProductColor" },
    sizes: { type: mongoose.SchemaTypes.ObjectId, ref: "ProductSize" },
    category: { type: String, required: true },
    description: { type: String, required: true },
    highlights: [String],
    details: { type: String, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);


ProductSchema.pre('remove', async function (next) {
  try {
    await Review.remove({ "_id": { $in: this.reviews } });
    await ProductImage.remove({ "_id": { $in: this.images } });
    await ProductColor.remove({ "_id": { $in: this.colors } });
    await ProductSize.remove({ "_id": { $in: this.sizes } });
    next();
  } catch (error) {
    next(error);
  }
});

ProductSchema.pre("save", async function (next) {
  await Review.bulkSave({})
});

module.exports = mongoose.model("Product", ProductSchema);
// https://stackoverflow.com/questions/11904159/automatically-remove-referencing-objects-on-deletion-in-mongodb
// https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-3
// https://archive.org/details/free-course-site.com-udemy-node.js-api-masterclass-with-express-mongo-db/8.+Authentication%2C+Users++Permissions+-+Part+2/5.+Forgot+Password+-+Send+Email.mp4