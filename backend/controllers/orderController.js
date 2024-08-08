import asyncHandler from "./../middlewares/asyncHandler.js";
import Order from "./../models/orderModel.js";
import Product from "./../models/productModel.js";
import { calcPrices } from "../utils/order.js";

export const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems && orderItems.length < 0) {
    return res.status(400).json({ error: "Order items is Required!" });
  }

  const itemsFromDB = await Product.find({
    _id: { $in: orderItems.map((x) => x._id) },
  });

  const dbOrderItems = orderItems.map((itemFromClient) => {
    const matchingItemFromDB = itemsFromDB.find(
      (i) => i._id.toString() === itemFromClient._id
    );

    if (!matchingItemFromDB) {
      return res.status(400).json({
        error: `Product not found : ${itemFromClient._id}`,
      });
    }

    return {
      ...itemFromClient,
      product: itemFromClient._id,
      price: matchingItemFromDB.price,
      _id: undefined,
    };
  });

  
  const order = new Order({
    orderItems: dbOrderItems,
    user: res.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();
  return res.status(201).json(createdOrder);
});

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id username");
  return res.status(200).json(orders);
});

export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: res.user._id });

  return res.status(200).json(order);
});

export const getTotalOrders = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments();
  return res.status(200).json({ totalOrders });
});

export const getTotalSales = asyncHandler(async (req, res) => {
  const orders = await Order.find({ isPaid: true });
  const sales = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  return res.status(200).json({ sales });
});

export const getTotalSalesByDate = asyncHandler(async (req, res) => {
  const salesByDate = await Order.aggregate([
    {
      $match: {
        isPaid: true,
      },
    },

    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%M-%d", date: "$paidAt" },
        },
        totalSales: { $sum: "$totalPrice" },
      },
    },
  ]);

  return res.status(200).json(salesByDate);
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "email username"
  );
  if (order) {
    return res.status(200).json(order);
  } else {
    return res.status(404).json({ error: "order not found" });
  }
});

export const updatePayment = asyncHandler(async (req, res) => {
  const { id, status, update_time, emaill_address } = req.body;

  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id,
      status,
      update_time,
      emaill_address,
    };

    const updatedOrder = await order.save();

    return res.status(200).json(updatedOrder);
  } else {
    return res.status(404).json({ error: "order not found" });
  }
});

export const updateDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updateOrder = await order.save();
    return res.status(200).json(updateOrder);
  } else {
    return res.status(404).json({ error: "order not found" });
  }
});
