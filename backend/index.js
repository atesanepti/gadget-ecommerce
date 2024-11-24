// packages
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

// utiles
import connectDB from "./config/db.js";

import userRouter from "./routes/userRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import productRouter from "./routes/productRouter.js";
import uploadRouter from "./routes/uploadRouter.js";
import orderRouter from "./routes/orderRouter.js";

dotenv.config();
const port = process.env.PORT || 4000;
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/users", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/uploads", uploadRouter);
app.use("/api/orders", orderRouter);

app.get("/api/config/paypal", (req, res) => {
  return res.status(200).json({
    config: {
      client: process.env.PAYPAL_CLIENT,
    },
  });
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(port, (error) => {
  if (!error) {
    console.log(`server is runnig successfuly at http://localhost:${port}`);
  } else {
    console.error(`Error : ${error.message}`);
  }
});
