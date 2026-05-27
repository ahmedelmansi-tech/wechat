import jwt from "jsonwebtoken";
export const genToken = async (ssh) => {
  return await jwt.sign({ ssh }, process.env.VITE_JWT_SECRET, {
    expiresIn: "1d",
  });
};
