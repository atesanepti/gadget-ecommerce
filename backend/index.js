// packages
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"



// utiles
import connectDB from "./config/db.js";
import userRouter from "./routes/userRouter.js"

dotenv.config()
const port = process.env.PORT || 4000;
connectDB()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/api/users", userRouter);

app.listen(port, (error) => {
  if (!error) {
    console.log(`server is runnig successfuly at http://localhost:${port}`);
  } else {
    console.error(`Error : ${error.message}`);
  }
});
