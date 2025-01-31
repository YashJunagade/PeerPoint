const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require("./routes/authRoutes");
const findPeerRoutes = require("./routes/findPeerRoutes");
const profileRoutes = require("./routes/profileRoutes");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connect...");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/auth", authRoutes);
app.use("/find", findPeerRoutes);
app.use("/profile", profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
