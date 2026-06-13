import express from "express";
const router = express.Router();
import { authorization } from "../middlewares/authMiddleware.js";
import { useAuthCookie } from "../middlewares/authCookieMiddleware.js";
import {
  getAllCurrentUsers,
  getMessagesWithOtherContact,
  sendAmessage,
  chatPartners,
} from "../controllers/messageController.js";

router.use(useAuthCookie);
router.get("/getAllCurrentUsers", getAllCurrentUsers);
router.get("/related", chatPartners);
router.get("/getMessagesWithOtherContact/:id", getMessagesWithOtherContact);
router.post("/send/:id", sendAmessage);
export default router;
