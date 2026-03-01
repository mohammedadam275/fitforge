const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Category = require("./models/Category");

dotenv.config();

const categories = [
  { name: "Strength Training" },
  { name: "Conditioning & Cardio" },
  { name: "Nutrition" },
  { name: "Recovery & Mobility" },
  { name: "Sport Performance" },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    await Category.deleteMany(); // Clear existing categories

    await Category.insertMany(categories);

    console.log("Categories seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDB();