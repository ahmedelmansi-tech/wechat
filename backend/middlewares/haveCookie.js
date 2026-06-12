export const doYouHaveCookie = (req, res, next) => {
  console.log("THE COOKIE IS".bgYellow, req.cookies);
  next();
};
