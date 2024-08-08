import express from "express";
import multer from "multer";
import path from "path";
import deleteImage from "./../utils/deleteImage.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    let fileName =
      file.originalname.replace(path.extname(file.originalname), "") +
      Date.now() +
      path.extname(file.originalname);

    fileName = fileName.replace(/ /g, "-");
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const acceptdFilesType = ["image/png", "image/jpg", "image/jpeg"];
  if (!file.mimetype.startsWith("image")) {
    cb(new Error("image file only"), false);
  } else if (!acceptdFilesType.includes(file.mimetype)) {
    cb(new Error("png or jpg only"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

const uploadSingleFile = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleFile(req, res, (error) => {
    if (error) {
      res.status(400).json({ message: error.message });
    } else if (req.file) {
      const image = `${process.env.SERVER_URL}/uploads/${req.file.filename}`;
      res.status(200).json({
        message: "image file uploaded",
        image: image,
      });
    } else {
      res.status(400).json({ message: "no image file provided" });
    }
  });
});

router.delete("/delete", async (req, res) => {
  try {

    const imagePath = req.body.image;
    const imagePathSegs = imagePath.split("/");
    const imageName = imagePathSegs[imagePathSegs.length - 1];

    await deleteImage(imageName);
    res.status(200).json({ message: "image was deleted" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});

export default router;
