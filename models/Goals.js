const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    investment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Investments",
    },
    saving: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Savings",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    target: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
    },
    start: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Goals", modelSchema);

module.exports = Entity;
