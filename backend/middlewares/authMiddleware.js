import jwt from "jsonwebtoken";
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
  const decodedToken = await jwt.decode(authToken, process.env.VITE_JWT_SECRET);
  console.log("DECOED TOKEN", decodedToken);

  if (!decodedToken) {
    return res.status(403).json({
      message: "Your are not authoraized (TOKEN not Valid)",
      code: "401",
      status: "error",
    });
  }
  next();
};
