import { validationResult } from "express-validator";

const runValidation = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      res.status(409).json({
        message: errors.array()[0].msg,
      });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export default runValidation;
