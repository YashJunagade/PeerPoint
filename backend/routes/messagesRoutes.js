const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { conversationList } = require("../controllers/messagesController");

router.get("/", authMiddleware, conversationList);

module.exports = router;
