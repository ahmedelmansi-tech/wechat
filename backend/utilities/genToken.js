import jwt from "jsonwebtoken";
export const genToken = async (ssh) => {
  const { VITE_JWT_SECRET } = process.env;
  if (!VITE_JWT_SECRET) throw new Error(`Secret didn't defined`);
  return await jwt.sign({ ssh }, process.env.VITE_JWT_SECRET, {
    expiresIn: "1d",
  });
};
