import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
export const useAuthCookie = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      message: "you are not authorized",
      status: "ERROR",
    });
  }

  const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET);

  req.authorizedUser = await User.findById(decoded.payload).select("-password");

  // console.log("decoded".underline, decoded);
  // console.log("authorizedUser".underline, req.authorizedUser);

  next();
};
