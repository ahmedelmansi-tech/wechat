import jwt from "jsonwebtoken";
import User from "../models/userSchema";

export const socketAuthMiddleWare = async (socket, next) => {
  try {
    // Extractng the Token (From Cookies)
    // jwt=abc123; theme=dark
    const token = socket.handShake.headers.cookie
      ?.split("; ")
      .find((part) => part.startsWith("jwt="))
      ?.split("=")[1];
    // Check if there is no token
    if (!token) {
      console.log("Socket Connection rejected : No token Provided");
      return next(new Error("Unauthorized - No Token Provided"));
    }
    // Verify the Token
    const decode = jwt.verify(token, process.env.VITE_JWT_SECRET);
    if (!decode) {
      console.log("Socket Connection rejected : invalid token Provided");
      return next(new Error("Unauthorized - Invalid Token Provided"));
    }

    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      console.log("Socket Connection rejected : User not found");
      return next(new Error("User not found"));
    }

    // After finding the User in the DB
    socket.user = user;
    socket.userId = user._id;
    console.log(
      `Socket authenticated for user: ${user.fullName} (${user._id})`,
    );
    next();
  } catch (error) {
    console.log("Error in socket authentication:", error.message);
    next(new Error("Unauthorized - Authentication failed"));
  }
};
