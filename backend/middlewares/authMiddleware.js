import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
export const authorization = async (req, res, next) => {
  // process.env.VITE_JWT_SECRET
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({
      message: "Your are not authoraized",
      code: "401",
      status: "error",
    });
  }
  const authToken = auth.split(" ")[1];
  const decodedToken = await jwt.verify(authToken, process.env.VITE_JWT_SECRET);
  console.log("DECOED TOKEN", decodedToken);

  if (!decodedToken) {
    return res.status(403).json({
      message: "Your are not authoraized (TOKEN not Valid)",
      code: "401",
      status: "error",
    });
  }

  if (decodedToken)
    req.authUser = await User.findById(decodedToken._id).select("-password");
  next();
};
