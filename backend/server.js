const log = console.log;
const PORT = process.env.PORT || 5500;
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
// import multer from "multer";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { jwtInCookies } from "./utilities/gentoken.cookies.js";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { server, app } from "./lib/socket.js";

// Connect to database
import { plugIn } from "./lib/dbConnect.js";

// Routers
import userRouter from "./routers/userRouter.js";
import messageRouter from "./routers/messageRoutes.js";
// Middlewares
import { errorHandling } from "./middlewares/errorMiddleware.js";
import { doYouHaveCookie } from "./middlewares/haveCookie.js";

app.use(cookieParser());
app.use(doYouHaveCookie);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(morgan("dev"));
// ATTENTION FRONTEND PORT
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["POST"],
//     allowedHeaders: ["Content-Type, Authorization"],
//   }),
// );
// ROUTES URL ---
app.use("/api/v1/users", userRouter);
app.use("/api/v1/message", messageRouter);
app.use(errorHandling);

// console.log(path.resolve("controllers"));

// log("import.meta.url".bold.bgGreen, import.meta.url);
// log(
//   "fileURLToPath(import.meta.url)".bold.bgGreen,
//   fileURLToPath(import.meta.url),
// );
// log("__DIRNAME".bold.bgYellow, path.resolve());
// log("__FILENAME".bold.bgYellow, path.dirname(path.resolve()));
log("process.cwd()".bold.bgGreen, process.cwd());

// PRODUCTION MOOOD
if (process.env.MODE === "production") {
  // الأول لتقديم الملفات الثابتة (JS, CSS, Images)، والثاني ليجعل جميع مسارات React تعمل حتى بعد إعادة تحميل الصفحة.
  app.use(express.static(path.join(path.resolve(), "../dist/index.html")));

  app.get("*", (req, res) => {
    app.sendFile(path.join(path.resolve(), "../dist/index.html"));
  });
}

server.listen(PORT, (req, res) => {
  plugIn();
  log(`app is working on server side on port ${PORT}`.bgWhite);
});
