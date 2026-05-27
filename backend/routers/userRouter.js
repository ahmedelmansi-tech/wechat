import express from "express";
const router = express.Router();
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
// Controllers
import {
  getusers,
  editeUser,
  register,
  deleteUser,
  login,
  editeUserData,
  imageUpload,
} from "../controllers/userControllers.js";
import { authorization } from "../middlewares/authMiddleware.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    switch (file.mimetype) {
      case "image/png":
      case "image/jpeg":
        cb(null, "uploads/");
        break;
      default:
        cb(new Error("File Type is not Valid"), false);
    }
  },
  filename: (req, file, cb) => {
    // save the file image preventing conflict of the same name
    console.log("FILE >> ", file);
    const ext = file.originalname.split(".")[1];
    const uniquename = `${uuidv4()}_${ext}`;
    req.body.image = uniquename;
    cb(null, uniquename);
  },
});

const upload = multer({
  // dest: "uploads/",
  storage,
  limits: 1024 * 1024 * 1,
});

// GET -   all users
// http://localhost:3300/api/v1/users/current-users
router.get("/current-users", authorization, getusers);

// REGISTER
// http://localhost:3300/api/v1/users/register
router.post("/register", register);

// LOGIN
router.post("/login", login);

// TRY - http://localhost:3300/api/v1/users/upload
router.post(
  "/upload/image",
  authorization,
  upload.single("user-image"),
  imageUpload,
);

// PUT
router.put("/restore/:id", editeUser);

// PUT - edite
router.put("/edite/:id", editeUserData);

// DELETE
router.delete("/:id", deleteUser);

export default router;
