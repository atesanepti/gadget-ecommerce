import { check } from "express-validator";

export const productValidator = [
  check("name")
    .notEmpty()
    .withMessage("product name is reqiured")
    .isLength({ min: 10, max: 100 })
    .withMessage("product name is should be minimum 10 and maximun 100 letters")
    .isAlpha("en-US")
    .isString()
    .withMessage("product name should be type string"),

  check("image").custom((image, { req }) => {
    if (!req.files) {
      throw new Error("product image is reqirued");
    }
  }),

  check("brand").notEmpty().withMessage("product brand name is reqiured"),

  check("quantity")
    .notEmpty()
    .withMessage("product brand name is reqiured")
    .isInt()
    .withMessage("product quantity should be type number"),

  check("category").notEmpty().withMessage("product category name is reqiured"),

  check("description")
    .notEmpty()
    .withMessage("product category name is reqiured"),


];

