const axios = require('axios');
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

async function searchFilm(title) {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query: title,
        language: 'en-US',
        page: 1
      }
    });

    // Check if we got any results
    if (response.data.results && response.data.results.length > 0) {
      const film = response.data.results[0]; // Get the top result
      return {
        id: film.id,
        title: film.title,
        year: film.release_date ? film.release_date.split('-')[0] : 'N/A',
        overview: film.overview,
        poster_path: film.poster_path,
        vote_average: film.vote_average
      };
    }
    return null; // No film found
  } catch (error) {
    console.error(`Error searching for film "${title}":`, error.message);
    return null;
  }
}

async function searchMultipleFilms(titles) {
  const searchPromises = titles.map(title => searchFilm(title));
  const results = await Promise.all(searchPromises);
  return results.filter(film => film !== null);
}

module.exports = {
  searchFilm, 
  searchMultipleFilms
};