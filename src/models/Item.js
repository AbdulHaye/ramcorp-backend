const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
         type: String,
         required: true, 
         enum: ["Water", "Food", "Medication", "C-Virus Vaccine"] },
         description: String,
});

module.exports = mongoose.model("Item", itemSchema);
