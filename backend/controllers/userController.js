import bcryptjs from "bcryptjs";

import asyncHandler from "./../middlewares/asyncHandler.js";
import User from "./../models/userModel.js";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("fill the all input");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res
      .status(400)
      .json({ message: "user already exist with this email" });
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassoword = await bcryptjs.hash(password, salt);

  const user = new User({
    username,
    email,
    password: hashedPassoword,
  });

  try {
    await user.save();

    //create jwt token and set in client cookie
    const token = createToken(res, user._id);

    return res.status(201).json({
      userId: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);

    throw new Error("invalid user input");
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("fill the all input");
  }

  const user = await User.findOne({ email });
  if (user) {
    //check password
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (isPasswordCorrect) {
      //create jwt token and set in client cookie
      const token = createToken(res, user._id);
      res.status(200).json({
        userId: user._id,
        username: user.username,
        email: user.email,
        token,
      });
    } else {
      res.status(401).json({ message: "authentication failed!" });
    }
  } else {
    res.status(401).json({ message: "authentication failed!" });
  }
});

const logout = asyncHandler(async (req, res, next) => {
  res.cookie("accessKey", "", {
    maxAge: new Date(0),
  });

  res.status(200).json({
    message: "logout successful",
  });
});

const getUsers = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find({ isAdmin: false }, { password: 0 }).lean();
  return res.status(200).json(allUsers);
});

const getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(res.user._id).select("-password").lean();

  if (user) {
    return res.status(200).json(user);
  } else {
    return res.status(404).json({ message: "user is not found" });
  }
});

const updateCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(res.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassoword = await bcryptjs.hash(req.body.password, salt);
      user.password = hashedPassoword;
    }

    const updatedUser = await user.save();

    return res.status(201).json({
      username: updatedUser.username,
      userId: updatedUser._id,
      email: updatedUser.email,
    });
  } else {
    return res.status(404).json({ message: "user is not found" });
  }
});

const deleteUserByAdmin = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      return res.status(400).json({ message: "admin can't be delete" });
    } else {
      await User.deleteOne({ _id: user._id });
      return res.status(200).json({ message: "user deleted" });
    }
  } else {
    return res.status(404).json({ message: "user is not found" });
  }
});


const getUserByAdmin = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    return res.status(200).json({
      username: user.username,
      email: user.email,
      userId: user._id,
    });
  } else {
    return res.status(404).json({ message: "user is not found" });
  }
});


const updateUserByAdmin = asyncHandler(async (req,res,next)=>{
  const user = await User.findById(req.params.id);

  if(user){
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin)

    const updatedUser = await user.save();

    return res.status(201).json({
      userId: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });

  }
  else{
     return res.status(404).json({ message: "user is not found" });
  
  }

})

export {
  createUser,
  loginUser,
  logout,
  getUsers,
  getCurrentUser,
  updateCurrentUser,
  deleteUserByAdmin,
  getUserByAdmin,
  updateUserByAdmin,
};
