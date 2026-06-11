import jwt from "jsonwebtoken";

export const jwtInCookies = (payload, res) => {
  const days = 3;
  const tokenInCookies = jwt.sign({ payload }, process.env.VITE_JWT_SECRET, {
    expiresIn: `${days}d`,
  });

  res.cookie("jwt", tokenInCookies, {
    maxAge: days * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.ENVIROMENT === "development" ? false : true,
  });

  return tokenInCookies;
};
