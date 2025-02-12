
const express = require("express");
const { createTrade } = require("../controllers/tradeController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createTrade);

module.exports = router;

