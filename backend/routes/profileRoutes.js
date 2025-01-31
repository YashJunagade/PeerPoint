const { Router } = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

const router = Router();

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("Fetching profile for user ID:", userId);

    const user = await User.findById(userId).select("-password").lean();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const user = await User.findById(req.params.id).select("-password").lean();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("Updating profile for user ID:", userId);

    if (!req.body.name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const updateFields = {
      name: req.body.name,
      role: req.body.role,
      college: req.body.college,
      university: req.body.university,
      bio: req.body.bio,
      expertise: req.body.expertise,
      achievements: req.body.achievements,
    };

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
