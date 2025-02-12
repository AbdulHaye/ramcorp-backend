const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const survivorRoutes = require("../survival-nexus/src/routes/survivorRoutes");
const tradeRoutes = require("../survival-nexus/src/routes/tradeRoutes");
const reportRoutes = require("../survival-nexus/src/routes/reportRoutes");
const itemRoutes = require("../survival-nexus/src/routes/itemRoutes");
const authRoutes = require("../survival-nexus/src/routes/authRoutes");

app.use("/api/survivors", survivorRoutes);
app.use("/api/trades", tradeRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/auth", authRoutes);

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
