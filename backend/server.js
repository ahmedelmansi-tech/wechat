const log = console.log;
const PORT = process.env.PORT || 5500;
import express from "express";
import multer from "multer";
import morgan from "morgan";
// import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const app = express();

// Connect to database
import { plugIn } from "./lib/dbConnect.js";

// Routers
import userRouter from "./routers/userRouter.js";
import messageRouter from "./routers/messageRoutes.js";
// Middlewares
import { errorHandling } from "./middlewares/errorMiddleware.js";
import { mock } from "./middlewares/mockup.js";

app.use(mock);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

// TRY
const data = multer({ dest: "data/" });
app.post("/try", data.single("cv"), (req, res) => {
  console.log("Iam Working All good ", req.body);

  res.json({
    a: req.file,
    b: req.body,
  });
});

app.listen(PORT, (req, res) => {
  plugIn();
  log(`app is working on server side on port ${PORT}`.bgWhite);
});
