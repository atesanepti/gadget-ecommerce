import express from "express";
import formidableMiddleware from "express-formidable";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddeware.js";
import {
  createProduct,
  fetchProducts,
  fetchProduct,
  updateProuct,
  deleteProduct,
  fetchAllProducts,
  addReview,
  topProductList,
  newProductList,
  updateReview,
  getFilteredProducts,
  getCategoryRelatedProducts,
} from "./../controllers/productController.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, authorizeAdmin, formidableMiddleware(), createProduct)
  .get(fetchProducts);

router.get("/allProduct", fetchAllProducts);
router.get("/top",topProductList);
router.get("/new", newProductList);
router.route("/filtered-products").post(getFilteredProducts);
router.get("/category/:category",getCategoryRelatedProducts)
router.route("/:productId/review")
.post(authenticate, addReview)
.put(authenticate,updateReview)

router
  .route("/:productId")
  .get(authenticate, fetchProduct)
  .put(authenticate, authorizeAdmin, formidableMiddleware(), updateProuct)
  .delete(authenticate, authorizeAdmin, deleteProduct);



export default router;
