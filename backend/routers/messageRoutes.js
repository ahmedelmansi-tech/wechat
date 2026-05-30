import express from "express";
const router = express.Router();
import { authorization } from "../middlewares/authMiddleware.js";
import {
  getAllCurrentUsers,
  getMessagesWithOtherContact,
  sendAmessage,
  chatPartners,
} from "../controllers/messageController.js";

router.get("/getAllCurrentUsers", authorization, getAllCurrentUsers);
router.get("/related", authorization, chatPartners);
router.get(
  "/getMessagesWithOtherContact/:id",
  authorization,
  getMessagesWithOtherContact,
);
router.post("/send/:id", authorization, sendAmessage);
export default router;
