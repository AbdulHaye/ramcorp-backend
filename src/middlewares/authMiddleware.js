
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; 
        next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;
