import express from "express";
import {
  createUser,
  loginUser,
  logout,
  getUsers,
  getCurrentUser,
  updateCurrentUser,
  deleteUserByAdmin,
  getUserByAdmin,
  updateUserByAdmin,
} from "../controllers/userController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddeware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getUsers);

router
  .route("/profile")
  .get(authenticate, getCurrentUser)
  .put(authenticate, updateCurrentUser);

router.post("/auth", loginUser);
router.post("/logout", logout);

//admin routes 
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserByAdmin)
  .get(authenticate, authorizeAdmin, getUserByAdmin)
  .put(authenticate, authorizeAdmin, updateUserByAdmin);

export default router;
