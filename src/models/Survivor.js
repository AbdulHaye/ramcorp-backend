const mongoose = require("mongoose");
const survivorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  lastLocation: {
    latitude: Number,
    longitude: Number,
  },
  inventory: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      // quantity: Number,
    },
  ],
  status: {
    type: String,
    enum: ["Healthy", "Infected"],
    required: true,
  },
  date: { type: Date, default: Date.now },

  tradeLogs: [
    {
      tradeId: { type: mongoose.Schema.Types.ObjectId, ref: "Trade" },
      date: { type: Date, default: Date.now },
    },
  ],
});
module.exports = mongoose.model("Survivor", survivorSchema);
