const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema(
  {
    survivor1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Survivor",
      required: true
    },
    survivor2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Survivor",
      required: true
    },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    tradeDate: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trade", tradeSchema);
