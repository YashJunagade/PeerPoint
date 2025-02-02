const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  conversationList,
  getMessages,
} = require("../controllers/messagesController");

router.get("/", authMiddleware, conversationList);
router.get("/:userId", authMiddleware, getMessages);

module.exports = router;
