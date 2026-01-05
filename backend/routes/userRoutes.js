import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// GET current logged-in user
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    message: "Access granted",
    userId: req.userId
  });
});

export default router;