import mongoose from "mongoose";
// const objectId = mongoose.Types.ObjectId;

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    quantity: { type: Number, required: true},
    category: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    description: { type: String, required: true, trim: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviws: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    stock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Product = new mongoose.model("Product", productSchema);

export default Product;
