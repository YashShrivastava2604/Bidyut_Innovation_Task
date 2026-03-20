import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Resource from "../models/resource.model.js";

dotenv.config();

const DEVTO_API = "https://dev.to/api/articles";

const seedData = async () => {
  try {
    await connectDB();

    console.log("Clearing old data...");
    await Resource.deleteMany();

    let allArticles = [];

    for (let page = 1; page <= 8; page++) {
      console.log(`Fetching page ${page}...`);

      const res = await fetch(`${DEVTO_API}?page=${page}&per_page=30`);
      const data = await res.json();

      const transformed = data.map((item) => ({
        title: item.title,
        description: item.description || item.title,
        url: item.url,
        tags: item.tag_list || [],
        category:
          item.tag_list && item.tag_list.length > 0
            ? item.tag_list[0]
            : "general",
      }));

      allArticles = [...allArticles, ...transformed];
    }

    console.log(`Inserting ${allArticles.length} resources...`);

    await Resource.insertMany(allArticles);

    console.log("Seeding completed 🚀");
    process.exit();
  } catch (error) {
    console.error("Seeding failed ❌", error.message);
    process.exit(1);
  }
};

seedData();