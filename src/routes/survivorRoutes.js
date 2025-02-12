const express = require("express");
const {
  createSurvivor,
  updateSurvivor,
  getSurvior,
} = require("../controllers/survivorController");
const router = express.Router();

router.post("/", createSurvivor);
router.put("/:id", updateSurvivor);
router.get("/", getSurvior);

module.exports = router;
