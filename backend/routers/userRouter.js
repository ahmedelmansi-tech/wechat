import express from "express";
const router = express.Router();
import multer from "multer";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
// Controllers
import {
  // getusers,
  // editeUser,
  // deleteUser,
  // editeUserData,
  // imageUpload,
  register,
  login,
  updateProfile,
  logOut,
  onlineUsers,
} from "../controllers/userControllers.js";
import { authorization } from "../middlewares/authMiddleware.js";
import { useAuthCookie } from "../middlewares/authCookieMiddleware.js";
import { jwtInCookies } from "../utilities/gentoken.cookies.js";

// REGISTER
// http://localhost:PORT/api/v1/users/register
router.post("/register", register);

// LOGIN
// http://localhost:PORT/api/v1/users/login
router.post("/login", login);

// update-profile
// http://localhost:PORT/api/v1/users/update-profile

const fileFilter = (req, file, callback) => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];

  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error("type not supported"), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, fl, cb) => {
    const uploadFilePath = path.resolve("backend", "usersdata");
    fs.mkdirSync(uploadFilePath, { recursive: true });
    cb(null, uploadFilePath);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".")[1];
    const name = file.originalname.split(".")[0];
    const savedName = `${name}${uuidv4()}.${ext}`;

    cb(null, savedName);
  },
});

const uploads = multer({ storage, fileFilter });
router.put(
  "/update-profile",
  useAuthCookie,
  uploads.single("profile_pic"),
  updateProfile,
);

router.post("/logout", logOut);

router.get("/check", useAuthCookie, (req, res) => {
  res.status(200).json({ message: "Access Granted", user: req.authorizedUser });
});

// http://localhost:PORT/api/v1/users/onlineUsers
router.post("/onlineUsers", useAuthCookie, onlineUsers);

export default router;
