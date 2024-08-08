import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";

export const createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      message: "category name is required",
    });
  }

  //check category name
  const existCategory = await Category.findOne({ name });
  if (existCategory) {
    return res.status(400).json({
      message: "this category alreday exist",
    });
  }

  const newCategory = new Category({
    name,
  });

  try {
    await newCategory.save();

    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).json({
      message: "server error please try agin",
    });
  }
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  if (!categoryId) {
    return res.status(400).json({
      message: "category id is required",
    });
  }

  const deletedCategory = await Category.findByIdAndDelete(categoryId).lean();
  if (!deletedCategory) {
    return res.status(404).json({
      message: "failed to delete",
    });
  }

  return res.status(200).json(deletedCategory);
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const { newCategory } = req.body;
  if (!newCategory) {
    return res.status(404).json({
      message: "category name is required",
    });
  }

  if (!categoryId) {
    return res.status(400).json({
      message: "category id is required",
    });
  }

  //check category
  const existCategory = await Category.findOne({ _id: categoryId });
  if (!existCategory) {
    return res.status(404).json({
      message: "category is not found",
    });
  }

  existCategory.name = newCategory;
  try {
    const updatedCategory = await existCategory.save();
    return res.status(201).json(updatedCategory);
  } catch (error) {
    return res.status(500).json({
      message: "category was not created",
    });
  }
});

export const fetchCategory = asyncHandler(async (req, res, next) => {
  const allCategory = await Category.find({});
  return res.status(200).json(allCategory);
});

export const findACategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  if (!categoryId) {
    return res.status(400).json({
      message: "category id is required",
    });
  }

  const category = await Category.findById(categoryId);
  if (!category) {
    return res.status(404).json({
      message: "category was not found",
    });
  }

  return res.status(200).json(category);
});
