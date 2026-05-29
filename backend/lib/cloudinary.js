import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.VITE_CLOUDINARY_API_SECRET,
});

export default cloudinary;
