const express = require("express");
const Answer = require("../models/Answer");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================
// CREATE ANSWER (Protected)
// ==========================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { body, questionId } = req.body;

    if (!body || !questionId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const answer = new Answer({
      body,
      question: questionId,
      author: req.user.id,
    });

    await answer.save();

    res.status(201).json(answer);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ==========================
// GET ANSWERS BY QUESTION
// ==========================
router.get("/question/:questionId", async (req, res) => {
  try {
    const answers = await Answer.find({
      question: req.params.questionId,
    })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.json(answers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;