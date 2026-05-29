import jwt from "jsonwebtoken";
export const genToken = async (_id) => {
  const { VITE_JWT_SECRET } = process.env;
  if (!VITE_JWT_SECRET) throw new Error(`Secret didn't define`);
  return await jwt.sign({ _id }, process.env.VITE_JWT_SECRET, {
    expiresIn: "1d",
  });
};
