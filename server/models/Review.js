const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    from: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
