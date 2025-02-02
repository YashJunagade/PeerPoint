const Message = require("../models/Message");
const User = require("../models/User");

exports.conversationList = async (req, res) => {
  try {
    const userId = req.user._id;
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

exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    })
      .sort({ timestamp: -1 })
      .limit(50)
      .lean();

    return res.status(200).json({
      success: true,
      messages: messages.reverse(),
      participants: {
        sender: req.user._id,
        receiver: userId,
      },
    });
  } catch (error) {
    console.error("Error in getMessages:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
