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
  updateProfile,
} from "../controllers/userControllers.js";
import { authorization } from "../middlewares/authMiddleware.js";
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    console.log(file);
    // Don't need these any more في وجود ال fileFilter
    // switch (file.mimetype) {
    //   case "image/png":
    //   case "image/jpg":
    //   case "image/jpeg":
    //     callback(null, "uploads");
    //     break;
    //   default:
    //     callback(new Error("invalid type of Image"), false);
    // }
    callback(null, "uploads");
  },
  filename: (request, file, callback) => {
    const ext = file.originalname.split(".")[1];
    const name = file.originalname.split(".")[0];
    callback(null, `${name}-${uuidv4()}.${ext}`);
  },
});

// Filefilter
const fileFilter = (req, file, cb) => {
  const allowedTyes = ["image/png", "image/jpg", "image/jpeg"];

  if (allowedTyes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("not supported Types"), false);
  }
};

// const uploads = multer({ dest: "uploads/" });
const uploads = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 1,
  },
});

// REGISTER
// http://localhost:PORT/api/v1/users/register
router.post("/register", register);

// LOGIN
// http://localhost:PORT/api/v1/users/login
router.post("/login", login);

// /update-profile
// http://localhost:PORT/api/v1/users//update-profile
router.put(
  "/update-profile",
  authorization,
  uploads.single("profile_pic"),
  updateProfile,
);

//----------------------------------------------------------------------------------DRAFT------------------------------------------------------------------------------------------------//
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     switch (file.mimetype) {
//       case "image/png":
//       case "image/jpeg":
//         cb(null, "uploads/");
//         break;
//       default:
//         cb(new Error("File Type is not Valid"), false);
//     }
//   },
//   filename: (req, file, cb) => {
//     // save the file image preventing conflict of the same name
//     console.log("FILE >> ", file);
//     const ext = file.originalname.split(".")[1];
//     const uniquename = `${uuidv4()}_${ext}`;
//     req.body.image = uniquename;
//     cb(null, uniquename);
//   },
// });

// const upload = multer({
//   // dest: "uploads/",
//   storage,
//   limits: 1024 * 1024 * 1,
// });

// GET -   all users
// http://localhost:3300/api/v1/users/current-users
router.get("/current-users", authorization, getusers);

// TRY - http://localhost:3300/api/v1/users/upload
// router.post(
//   "/upload/image",
//   authorization,
//   upload.single("user-image"),
//   imageUpload,
// );

// PUT
router.put("/restore/:id", editeUser);

// PUT - edite
router.put("/edite/:id", editeUserData);

// DELETE
router.delete("/:id", deleteUser);

export default router;
