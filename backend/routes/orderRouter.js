import express from "express";
const router = express.Router();

import { authenticate, authorizeAdmin } from "../middlewares/authMiddeware.js";
import {
  createOrder,
  getOrders,
  getOrder,
  getTotalOrders,
  getTotalSales,
  getTotalSalesByDate,
  getOrderById,
  updatePayment,
  updateDelivered,
} from "../controllers/orderController.js";

router.route("/").post(authenticate, createOrder)
.get(authenticate,authorizeAdmin,getOrders)

router.get('/mime',authenticate,getOrder);
router.get("/total-orders", authenticate, authorizeAdmin,getTotalOrders);
router.get("/total-sales", authenticate, authorizeAdmin, getTotalSales);
router.get(
  "/total-sales-by-date",
  authenticate,
  authorizeAdmin,
  getTotalSalesByDate
);
router.get("/:id", authenticate,getOrderById );

router.route("/:id/pay")
.put(authenticate,updatePayment)

router.route("/:id/delivered").put(authenticate,authorizeAdmin, updateDelivered);

export default router;
