// Load environment variables
require("dotenv").config();

// Import Express
const express = require("express");
const cors = require("cors");

// Import our services
const { searchFilm, searchMultipleFilms } = require("./tmdbService");
const { getRecommendations } = require("./claudeService");

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Test route - just to verify server is running
app.get("/", (req, res) => {
  res.json({ message: "Film Sommelier API is running!" });
});

// Film search route
app.get("/api/films/search", async (req, res) => {
  try {
    const { query } = req.query; // Get search term from URL query params

    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const film = await searchFilm(query);

    if (!film) {
      return res.status(404).json({ error: "Film not found" });
    }

    res.json({ film });
  } catch (error) {
    console.error("Error in /api/films/search:", error.message);
    res.status(500).json({ error: "Failed to search for film" });
  }
});

// Recommendations route
app.post("/api/recommendations", async (req, res) => {
  try {
    const { films, context, excludeFilms } = req.body;

    // Validate input
    if (!films || !Array.isArray(films) || films.length === 0) {
      return res.status(400).json({ error: "Films array is required" });
    }

    // Get recommendations from Claude
    const recommendations = await getRecommendations(
      films,
      context,
      excludeFilms
    );

    if (recommendations === null) {
      return res.status(500).json({ error: "Failed to get recommendations" });
    }

    res.json({
      success: true,
      recommendations,
    });
  } catch (error) {
    console.error("Error in /api/recommendations:", error.message);
    res.status(500).json({ error: "Failed to get recommendations" });
  }
});

// Multiple film search route
app.post("/api/films/search-multiple", async (req, res) => {
  try {
    const { titles } = req.body;

    if (!titles || !Array.isArray(titles) || titles.length === 0) {
      return res.status(400).json({ error: "Titles array is required" });
    }

    const films = await searchMultipleFilms(titles);

    res.json({
      success: true,
      films,
    });
  } catch (error) {
    console.error("Error in /api/films/search-multiple:", error.message);
    res.status(500).json({ error: "Failed to search for films" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
