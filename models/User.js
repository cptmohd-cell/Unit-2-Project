const mongoose = require("mongoose");

/**
 * User Schema - Defines the structure for user accounts
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isGuest: {
    type: Boolean,
    default: false,
  },
});

userSchema.virtual("parts", {
  ref: "Part",
  localField: "_id",
  foreignField: "owner",
});
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });
// Compile model from schema

const User = mongoose.model("User", userSchema);

module.exports = User;
