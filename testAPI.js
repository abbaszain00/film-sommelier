// Test script for our Express API

async function testAPI() {
  console.log("🧪 Testing Film Sommelier API...\n");

  const BASE_URL = "http://localhost:3000";

  // Test 1: Root endpoint
  console.log("Test 1: GET / (root)");
  try {
    const response = await fetch(`${BASE_URL}/`);
    const data = await response.json();
    console.log("✅ Response:", data);
  } catch (error) {
    console.log("❌ Error:", error.message);
  }
  console.log("\n---\n");

  // Test 2: Search for a film
  console.log("Test 2: GET /api/films/search?query=Inception");
  try {
    const response = await fetch(
      `${BASE_URL}/api/films/search?query=Inception`
    );
    const data = await response.json();
    console.log("✅ Response:", data);
  } catch (error) {
    console.log("❌ Error:", error.message);
  }
  console.log("\n---\n");

  // Test 3: Get recommendations
  console.log("Test 3: POST /api/recommendations");
  try {
    const response = await fetch(`${BASE_URL}/api/recommendations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        films: [
          { title: "Inception", year: "2010" },
          { title: "Interstellar", year: "2014" },
        ],
        context: "I love Christopher Nolan films with complex narratives",
        excludeFilms: ["The Prestige", "Tenet"],
      }),
    });
    const data = await response.json();

    if (data.success) {
      console.log("✅ Got recommendations:");
      data.recommendations.forEach((rec, i) => {
        console.log(`\n${i + 1}. ${rec.title}`);
        console.log(`   ${rec.reason}`);
      });
    } else {
      console.log("❌ Failed:", data.error);
    }
  } catch (error) {
    console.log("❌ Error:", error.message);
  }
  console.log("\n---\n");

  console.log("✅ All tests complete!");
}

// Run tests
testAPI();
