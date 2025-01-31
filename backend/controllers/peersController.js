const User = require("../models/User");

const peers = async (req, res) => {
  try {
    const helper = await User.find({ role: "mentor" }).select("-password");
    res.status(200).json(helper);
  } catch (err) {
    console.log("error fetching helpers", err);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = peers;
