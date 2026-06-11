export const doYouHaveCookie = (req, res, next) => {
  console.log("THE COOKIE IS".bgGreen, req.cookies);
  next();
};
