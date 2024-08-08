import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  fetchCategory,
  findACategory,
} from "../controllers/categoryController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddeware.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, authorizeAdmin, createCategory)
  .get(fetchCategory);

router
  .route("/:categoryId")
  .delete(authenticate, authorizeAdmin, deleteCategory)
  .put(authenticate, authorizeAdmin, updateCategory)
  .get(findACategory);

export default router;
