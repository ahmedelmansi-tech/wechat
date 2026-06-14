import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
const router = express.Router();
import { authorization } from "../middlewares/authMiddleware.js";
import { useAuthCookie } from "../middlewares/authCookieMiddleware.js";
import {
  getAllCurrentUsers,
  getMessagesWithOtherContact,
  sendAmessage,
  chatPartners,
} from "../controllers/messageController.js";

// (1)
const fileFilter = (req, file, cb) => {
  // console.log("FILE ", file); //to visulaize the shape of the file
  const allowedTypesOfImages = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "image/avif",
  ];

  if (allowedTypesOfImages.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("can't use these image"), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = path.resolve("backend", "sms");
    console.log(filePath);

    fs.mkdirSync(filePath, { recursive: true });
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const imageSMS = multer({ storage, fileFilter });

router.use(useAuthCookie);
router.get("/getAllCurrentUsers", getAllCurrentUsers);
router.get("/related", chatPartners);
router.get("/getMessagesWithOtherContact/:id", getMessagesWithOtherContact);
router.post("/send/:id", imageSMS.single("image"), sendAmessage);
export default router;
