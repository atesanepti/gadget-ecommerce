import mongoose from "mongoose";

const cateogorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const Category = new mongoose.model("Category", cateogorySchema);

export default Category;
