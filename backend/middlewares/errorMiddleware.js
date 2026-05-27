import colors from "colors";

export const errorHandling = (err, req, res, next) => {
  console.log("CAUTION ⚠️ ⚠️ ⚠️  Pay Attention".bgRed);
  return res.status(400).json({
    error: "ERRO HAPPEN",
    message: err.message,
    stack: err.stack,
  });
};
