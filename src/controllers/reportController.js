const Survivor = require("../models/Survivor");

exports.getReports = async (req, res) => {
    try {
        const totalSurvivors = await Survivor.countDocuments();
        const infectedCount = await Survivor.countDocuments({ infected: true });

        res.json({
            infectedPercentage: (infectedCount / totalSurvivors) * 100,
            nonInfectedPercentage: ((totalSurvivors - infectedCount) / totalSurvivors) * 100
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
