const Survivor = require("../models/Survivor");
exports.createSurvivor = async (req, res) => {
    try {
        const newSurvivor = new Survivor(req.body);
        await newSurvivor.save();
        res.status(201).json(newSurvivor);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
const mongoose = require("mongoose");
exports.updateSurvivor = async (req, res) => {
    try {
        let updateData = req.body;
        if (!updateData.inventory) {
            updateData.inventory = [];
        } else if (Array.isArray(updateData.inventory)) {
            updateData.inventory = updateData.inventory.map(item => {
                if (typeof item === "string") {
                    return { item: new mongoose.Types.ObjectId(item) };
                }
                if (item.item && typeof item.item === "string") {
                    return { item: new mongoose.Types.ObjectId(item.item) };
                }
                return item;
            });
        } else {
            return res.status(400).json({ error: "Inventory must be an array" });
        }
        const survivor = await Survivor.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        if (!survivor) {
            return res.status(404).json({ error: "Survivor not found" });
        }
        res.json(survivor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "Server error" });
    }
};
exports.getSurvior=async(req,res)=>{
    try{
        const survivors = await Survivor.find().populate("inventory.item");
        res.json(survivors);
    }catch(error){
        res.status(500).json({ error: "Server error" });
    }
}