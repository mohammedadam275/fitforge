const questionRoutes = require("./routes/question.routes");
const connectDB = require("./config/db");
// Import required packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const categoryRoutes = require("./routes/category.routes");
const authRoutes = require("./routes/auth.routes");
const answerRoutes = require("./routes/answer.routes");
// Load environment variables
dotenv.config();
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "FitForge API is running." });
});

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});