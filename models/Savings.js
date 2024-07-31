const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    isMonthly: {
      type: Boolean,
      default: true,
    },
    increase: {
      type: Number,
      required: true,
    },
    start: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Savings", modelSchema);

module.exports = Entity;
