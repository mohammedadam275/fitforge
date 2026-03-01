const express = require("express");
const Question = require("../models/Question");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================
// CREATE QUESTION (Protected)
// ==========================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, body, categoryId } = req.body;

    if (!title || !body || !categoryId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const question = new Question({
      title,
      body,
      category: categoryId,
      author: req.user.id,
    });

    await question.save();

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ==========================
// GET QUESTIONS BY CATEGORY
// ==========================
router.get("/category/:categoryId", async (req, res) => {
  try {
    const questions = await Question.find({
      category: req.params.categoryId,
    })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;