const Anthropic = require("@anthropic-ai/sdk");

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function getRecommendations(films, context = "", excludeFilms = []) {
  try {
    // Build the prompt for Claude
    const filmList = films.map((f) => `- ${f.title} (${f.year})`).join("\n");
    const excludeList =
      excludeFilms.length > 0
        ? `\n\nDo not recommend these films (user has already seen them):\n${excludeFilms
            .map((f) => `- ${f}`)
            .join("\n")}`
        : "";

    const userMessage = `I enjoyed these films:
${filmList}
${context ? `\nWhat I liked: ${context}` : ""}${excludeList}

Based on these films, recommend 5 movies I would enjoy. For each recommendation, explain why it matches what I'm looking for.

Format your response as a JSON array with this structure:
[
  {
    "title": "Film Title",
    "reason": "Brief explanation of why this matches (2-3 sentences)"
  }
]

Only return the JSON array, no other text.`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    // Extract the text response
    const responseText = message.content[0].text;

    // Parse the JSON response
    const recommendations = JSON.parse(responseText);

    return recommendations;
  } catch (error) {
    console.error("Error getting recommendations:", error.message);
    return null;
  }
}

module.exports = {
  getRecommendations,
};
