const ConnectionRequest = require("../models/ConnectionRequest");
const User = require("../models/User");

exports.sendConnectionRequest = async (req, res) => {
  try {
    const { receiverId, sender } = req.body;
    const senderId = sender; // Assuming you have auth middleware

    // Check if request already exists
    const existingRequest = await ConnectionRequest.findOne({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "Connection request already sent" });
    }

    const newRequest = await ConnectionRequest.create({
      sender: senderId,
      receiver: receiverId,
    });

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await ConnectionRequest.find({
      receiver: req.user._id,
      status: "pending",
    }).populate("sender", "name email");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.respondToRequest = async (req, res) => {
  try {
    const { requestId, status } = req.body;
    const userId = req.user._id;

    const request = await ConnectionRequest.findOne({
      _id: requestId,
      receiver: userId,
      status: "pending",
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status;
    await request.save();

    if (status === "accepted") {
      // Add users to each other's connections/friends list
      await User.findByIdAndUpdate(request.sender, {
        $addToSet: { connections: request.receiver },
      });
      await User.findByIdAndUpdate(request.receiver, {
        $addToSet: { connections: request.sender },
      });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
