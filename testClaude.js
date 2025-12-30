// Load environment variables
require('dotenv').config();

// Import both services
const { searchMultipleFilms } = require('./tmdbService');
const { getRecommendations } = require('./claudeService');

async function runTest() {
  console.log('🎬 Testing Full Film Recommendation Flow...\n');

  // Step 1: Search for films the user likes
  console.log('Step 1: Searching for films on TMDB...');
  const films = await searchMultipleFilms([
    'Gangs of Wasseypur',
    'Raat Akeli Hai'
  ]);

  console.log('Found films:');
  films.forEach(f => console.log(`  - ${f.title} (${f.year})`));
  console.log('\n---\n');

  // Step 2: Get recommendations from Claude
  console.log('Step 2: Getting recommendations from Claude...');
  const recommendations = await getRecommendations(
    films,
    'I love gritty Indian crime dramas',
    ['Satya', 'Gangs of Wasseypur Part 2']  // Films to exclude
  );

  if (recommendations === null) {
    console.log('❌ Failed to get recommendations');
    return;
  }

  console.log(`\n✅ Got ${recommendations.length} recommendations:\n`);

  recommendations.forEach((rec, index) => {
    console.log(`${index + 1}. ${rec.title}`);
    console.log(`   ${rec.reason}\n`);
  });

  console.log('---\n');
  console.log('✅ Test complete!');
}

// Run the test
runTest();
