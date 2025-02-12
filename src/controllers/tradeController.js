
const Trade = require("../models/Trade");
const Survivor = require("../models/Survivor");
const Item = require("../models/Item");
const mongoose = require("mongoose");
exports.createTrade = async (req, res) => {
    const { survivor1Id, survivor2Id, items } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(survivor1Id) || !mongoose.Types.ObjectId.isValid(survivor2Id)) {
            return res.status(400).json({ error: "Invalid survivor ID format" });
        }

        const survivor1 = await Survivor.findById(survivor1Id);
        if (!survivor1) {
            return res.status(404).json({ error: `Survivor 1 with ID ${survivor1Id} not found` });
        }

        const survivor2 = await Survivor.findById(survivor2Id);
        if (!survivor2) {
            return res.status(404).json({ error: `Survivor 2 with ID ${survivor2Id} not found` });
        }
        if (!items || items.length === 0) {
            return res.status(400).json({ error: "Items array cannot be empty" });
        }
        for (let i = 0; i < items.length; i++) {
            const item = await Item.findById(items[i].item);
            if (!item) {
                return res.status(404).json({ error: `Item with ID ${items[i].item} not found` });
            }
        }

        const trade = new Trade({
            survivor1: survivor1Id,
            survivor2: survivor2Id,
            items: items,
            date: new Date(),
        });

        await trade.save();

        survivor1.tradeLogs.push({ tradeId: trade._id });
        survivor2.tradeLogs.push({ tradeId: trade._id });

        for (let i = 0; i < items.length; i++) {
            survivor1.inventory.push({ item: items[i].item, quantity: items[i].quantity });
            survivor2.inventory.push({ item: items[i].item, quantity: items[i].quantity });
        }

        await survivor1.save();
        await survivor2.save();
        res.status(201).json(trade);

    } catch (error) {
        console.error("Error occurred during trade:", error);
        res.status(500).json({ error: "Server error: Failed to create trade", details: error.message });
    }
};
