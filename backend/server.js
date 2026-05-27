const log = console.log;
const PORT = process.env.PORT || 5500;
import express from "express";
import morgan from "morgan";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const app = express();

// Connect to database
import { plugIn } from "./lib/dbConnect.js";

// Routers
import userRouter from "./routers/userRouter.js";

// Middlewares
import { errorHandling } from "./middlewares/errorMiddleware.js";
import { mock } from "./middlewares/mockup.js";
app.use(mock);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/api/v1/users", userRouter);
app.use(errorHandling);

app.listen(PORT, (req, res) => {
  plugIn();
  log(`app is working on server side on port ${PORT}`.bgWhite);
});
