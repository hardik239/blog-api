const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    replies: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comments", CommentsSchema);
