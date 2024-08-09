import jwt from "jsonwebtoken";
import User from "./../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies.accessKey;
  console.log("token = ",token)
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      if (!decoded)
        return res.status(401).json({
          message: "authentication failed! please login",
        });
      res.user = await User.findById(decoded.userId).select("-password").lean();
  
      next();
    } catch (error) {
      console.log(error);

      return res.status(401).json({
        message: "authentication failed! please login",
      });
    }
  } else {
    return res.status(401).json({
      message: "authentication failed! please login",
    });
  }
});

const authorizeAdmin = asyncHandler(async (req, res, next) => {
  if (res.user && res.user.isAdmin) {
    next();
  } else {
    return res.status(400).json({
      message: "only admin can access this route",
    });
  }
});

export { authenticate, authorizeAdmin };
