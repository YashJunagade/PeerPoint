const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["seeker", "mentor"],
    },
    profileImage: {
      type: String,
      default: null,
    },
    college: {
      type: String,
      trim: true,
    },
    university: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
      maxLength: 1000,
    },
    expertise: [
      {
        type: String,
        trim: true,
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    achievements: [
      {
        type: String,
        trim: true,
      },
    ],
    connections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    stats: {
      mentored: {
        type: Number,
        default: 0,
      },
      sessions: {
        type: Number,
        default: 0,
      },
      hours: {
        type: Number,
        default: 0,
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

// Password hashing middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const bcrypt = require("bcryptjs");
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  const bcrypt = require("bcryptjs");
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to update rating when a new review is added
userSchema.methods.updateRating = function () {
  if (this.reviews.length === 0) {
    this.rating = 0;
    return;
  }

  const totalRating = this.reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  this.rating = Number((totalRating / this.reviews.length).toFixed(1));
};

// Virtual for review count
userSchema.virtual("reviewCount").get(function () {
  return this.reviews.length;
});

module.exports = mongoose.model("User", userSchema);
