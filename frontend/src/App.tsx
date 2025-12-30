import { useState } from "react";

function App() {
  // State
  const [films, setFilms] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [context, setContext] = useState("");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search TMDB as user types - returns multiple results
  const searchFilms = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);
    setShowDropdown(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/films/search-query?query=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();

      if (data.success && data.films && data.films.length > 0) {
        setSearchResults(data.films);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Select film from dropdown
  const handleSelectFilm = (film: any) => {
    const filmTitle = `${film.title} (${film.year})`;
    setFilms([...films, filmTitle]);
    setInputValue("");
    setSearchResults([]);
    setShowDropdown(false);
  };

  // Remove film tag
  const handleRemoveFilm = (index: number) => {
    setFilms(films.filter((_, i) => i !== index));
  };

  // Get recommendations from backend
  const handleGetRecommendations = async () => {
    if (films.length === 0) {
      setError("Please add at least one film");
      return;
    }

    setIsLoadingRecs(true);
    setError(null);
    setRecommendations([]);

    try {
      // First, search for all films to get their metadata
      const filmTitles = films.map((f) => f.split(" (")[0]); // Remove year from string

      const searchResponse = await fetch(
        "http://localhost:3000/api/films/search-multiple",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ titles: filmTitles }),
        }
      );

      const searchData = await searchResponse.json();

      if (!searchData.success || !searchData.films) {
        throw new Error("Failed to search for films");
      }

      // Then get recommendations
      const recsResponse = await fetch(
        "http://localhost:3000/api/recommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            films: searchData.films,
            context: context || "Films similar to my favorites",
            excludeFilms: [],
          }),
        }
      );

      const recsData = await recsResponse.json();

      if (!recsData.success || !recsData.recommendations) {
        throw new Error("Failed to get recommendations");
      }

      setRecommendations(recsData.recommendations);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to get recommendations"
      );
    } finally {
      setIsLoadingRecs(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🎬 Film Sommelier
          </h1>
          <p className="text-gray-300 text-lg">
            Your AI-powered film recommendation assistant
          </p>
        </header>

        {/* Input Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">Films you like</h2>

          {/* Search Input with Dropdown */}
          <div className="relative mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                searchFilms(e.target.value);
              }}
              onFocus={() => {
                if (searchResults.length > 0) setShowDropdown(true);
              }}
              placeholder="Search for a film..."
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
            />

            {/* Dropdown with Posters */}
            {showDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                {isSearching && (
                  <div className="p-4 text-gray-400 text-center">
                    Searching TMDB...
                  </div>
                )}

                {!isSearching &&
                  searchResults.length === 0 &&
                  inputValue.length >= 2 && (
                    <div className="p-4 text-gray-400 text-center">
                      No films found
                    </div>
                  )}

                {!isSearching &&
                  searchResults.map((film, index) => (
                    <div
                      key={film.id || index}
                      onClick={() => handleSelectFilm(film)}
                      className="flex items-center gap-3 p-3 hover:bg-gray-600 cursor-pointer border-b border-gray-600 last:border-b-0 transition"
                    >
                      {/* Poster Image */}
                      <div className="flex-shrink-0 w-12 h-18 bg-gray-600 rounded overflow-hidden">
                        {film.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w92${film.poster_path}`}
                            alt={film.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                            No poster
                          </div>
                        )}
                      </div>

                      {/* Film Info */}
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">
                          {film.title}
                        </div>
                        <div className="text-sm text-gray-400">
                          {film.year} • ⭐ {film.vote_average.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Film Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {films.map((film, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 bg-purple-600 px-3 py-1 rounded-full text-sm hover:bg-purple-700 transition"
              >
                {film}
                <button
                  onClick={() => handleRemoveFilm(index)}
                  className="hover:text-red-300 font-bold text-lg leading-none"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Context Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-300">
              What did you like about these films? (optional)
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g., I love gritty crime dramas with complex characters..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition resize-none"
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
              {error}
            </div>
          )}

          {/* Get Recommendations Button */}
          <button
            onClick={handleGetRecommendations}
            disabled={isLoadingRecs || films.length === 0}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {isLoadingRecs
              ? "Getting recommendations..."
              : "Get Recommendations"}
          </button>
        </div>

        {/* Loading State */}
        {isLoadingRecs && (
          <div className="text-center text-gray-300 mb-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            <p className="mt-2">Asking Claude for recommendations...</p>
          </div>
        )}

        {/* Recommendations Display */}
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg p-6 transform transition hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-2xl font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {rec.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{rec.reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
