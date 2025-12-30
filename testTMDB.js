// Load environment variables from .env file
require('dotenv').config();

// Import our TMDB service
const { searchFilm, searchMultipleFilms } = require('./tmdbService');

async function runTests() {
  console.log('🎬 Testing TMDB Service...\n');

  // Test 1: Search for a single film
  console.log('Test 1: Searching for "Inception"...');
  const inception = await searchFilm('Inception');
  console.log(inception);
  console.log('\n---\n');

  // Test 2: Search for multiple films
  console.log('Test 2: Searching for multiple films...');
  const films = await searchMultipleFilms([
    'Gangs of Wasseypur',
    'Raat Akeli Hai',
    'Inception'
  ]);
  console.log(films);
  console.log('\n---\n');

  console.log('✅ Tests complete!');
}

// Run the tests
runTests();