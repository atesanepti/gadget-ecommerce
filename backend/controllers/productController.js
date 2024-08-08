import Product from "../models/productModel.js";
import asyncHandler from "./../middlewares/asyncHandler.js";
import Category from "./../models/categoryModel.js";

export const createProduct = asyncHandler(async (req, res) => {
  const { name, brand, quantity, category, description, price, stock } =
    req.fields;
  switch (true) {
    case !name:
      return res.status(409).json({
        message: "product name is required",
      });

    case !brand:
      return res.status(409).json({
        message: "product brand name is required",
      });

    case !quantity:
      return res.status(409).json({
        message: "product quanitity is required",
      });
    case !category:
      return res.status(409).json({
        message: "product category is required",
      });

    case !description:
      return res.status(409).json({
        message: "product description is required",
      });
    case !price:
      return res.status(409).json({
        message: "product price is required",
      });

    case !stock:
      return res.status(409).json({
        message: "stock is required",
      });
  }

  try {
    const newProduct = new Product({ ...req.fields });
    await newProduct.save();

    return res.status(201).json(newProduct);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "product was not created",
    });
  }
});

export const fetchProducts = asyncHandler(async (req, res) => {
  const pageSize = 60;
  const search = req.params.search
    ? { name: { $regex: req.params.search, $options: "i" } }
    : {};

  const count = await Product.countDocuments(search);
  const products = await Product.find(search).limit(pageSize);

  return res.status(200).json({
    products,
    page: 1,
    pages: Math.ceil(count / pageSize),
    hasMore: false,
  });
});

export const fetchProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "product was not found" });
  }

  return res.status(200).json(product);
});

export const updateProuct = asyncHandler(async (req, res) => {
  const { name, brand, quantity, category, description, price } = req.fields;
  switch (true) {
    case !name:
      return res.status(409).json({
        message: "product name is required",
      });

    case !brand:
      return res.status(409).json({
        message: "product brand name is required",
      });

    case !quantity:
      return res.status(409).json({
        message: "product quanitity is required",
      });
    case !category:
      return res.status(409).json({
        message: "product category is required",
      });

    case !description:
      return res.status(409).json({
        message: "product description is required",
      });
    case !price:
      return res.status(409).json({
        message: "product price is required",
      });
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: req.params.productId },
    { ...req.fields },
    { new: true }
  );
  await updatedProduct.save();
  console.log(updatedProduct);

  if (!updatedProduct) {
    return res.status(500).json({ message: "product was not updated" });
  }

  return res.status(201).json(updatedProduct);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
  if (!deletedProduct) {
    return res.status(500).json({ messsage: "product was not deleted" });
  }
  return res.status(200).json(deletedProduct);
});

export const fetchAllProducts = asyncHandler(async (req, res) => {
  const allProducts = await Product.find({})
    .populate("category")
    .limit(12)
    .sort({ createAt: -1 });
  return res.status(200).json(allProducts);
});

export const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.productId);

  if (product) {
    const reviewed = product.reviews.find(
      (r) => r.user.toString() == res.user._id.toString()
    );

    if (reviewed) {
      return res.status(400).json({
        error: "product alreadey reviewed",
      });
    }

    const review = {
      name: res.user.username,
      rating: Number(rating),
      comment,
      user: res.user._id,
    };

    product.reviews.push(review);
    product.numReviws = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length;

    try {
      await product.save();

      res.status(201).json({ message: "review was added" });
    } catch (error) {
      return res.status(500).json({ error: "review was not added" });
    }
  } else {
    return res.status(404).json({ error: "product was not found" });
  }
});

export const updateReview = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  const { comment } = req.body;
  const product = await Product.findOne({ _id: productId });
  if (product) {
    const reviewExist = product.reviews.find(
      (r) => r.user.toString() == res.user._id.toString()
    );

    if (reviewExist) {
      const reviews = product.reviews.filter(
        (r) => r.user.toString() !== res.user._id.toString()
      );

      const newSingleReview = {
        ...reviewExist,
        comment,
      };
      reviews.push(newSingleReview);
      product.reviews = reviews;

      try {
        await product.save();
        return res.status(201).json({ message: "review updated" });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: `${error.message}` });
      }
    } else {
      return res.status(400).json({
        error: "review didn't found",
      });
    }
  } else {
    return res.status(405).json({
      error: "product was not found",
    });
  }
});

export const topProductList = asyncHandler(async (req, res) => {
  const topProducts = await Product.find({}).sort({ rating: -1 }).limit(6);
  return res.status(200).json(topProducts);
});

export const newProductList = asyncHandler(async (req, res) => {
  const newProducts = await Product.find({}).sort({ _id: -1 }).limit(4);
  return res.status(200).json(newProducts);
});

export const getFilteredProducts = asyncHandler(async (req, res) => {
  const { checked, radio } = req.body;

  console.log("checked", checked);
  console.log("radio", radio);

  const args = {};
  if (checked.length > 0) {
    args.category = checked;
  }
  if (radio.length > 0) {
    args.price = { $gte: radio[0], $lte: radio[1] };
  }
  console.log("args", args);
  // args = { categories : ["3497592485jlkasdlkflkadklf"]  }

  const filteredProducts = await Product.find(args);

  return res.status(200).json(filteredProducts);
});

export const getCategoryRelatedProducts = asyncHandler(async (req, res) => {
  const { category } = req.params || "";

  const existCategory = await Category.findById(category);

  if (!existCategory) {
    return res.status(400).json({
      error: "category not found",
    });
  }
  const products = await Product.find({ category: category });
  console.log("products", products);
  return res.status(200).json(products);
});
