const User = require("../models/User");

exports.conversationList = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(403).json({ error: "Login to see your conversations" });
    }

    const user = await User.findById(userId).populate(
      "connections",
      "name email"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ connections: user.connections });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
