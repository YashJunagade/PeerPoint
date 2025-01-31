const express = require("express");
const router = express.Router();
const {
  sendConnectionRequest,
  getPendingRequests,
  respondToRequest,
} = require("../controllers/connectionController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/send", authMiddleware, sendConnectionRequest);
router.get("/pending", authMiddleware, getPendingRequests);
router.post("/respond", authMiddleware, respondToRequest);

module.exports = router;
