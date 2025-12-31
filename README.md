# Film Sommelier

A web app that recommends films based on multiple movies you've enjoyed. I built this because I was frustrated with generic AI recommendations - I wanted something that could find the connection between several films I liked, not just suggest "movies like X."

Particularly useful for discovering niche content (like gritty Indian crime dramas).

## What it does

- Search for films you've enjoyed (autocomplete with posters from TMDB)
- Add multiple films as tags
- Optionally describe what you liked about them
- Get 5 AI-powered recommendations from Claude with explanations
- Mark films as "already watched" to exclude them from future suggestions
- View posters, ratings, and links to TMDB/IMDB for each recommendation

## Tech stack

**Frontend:** React, TypeScript, Tailwind CSS, Vite  
**Backend:** Node.js, Express  
**APIs:** TMDB (film data), Anthropic Claude (recommendations)

## Running it locally

You'll need API keys from [TMDB](https://www.themoviedb.org/settings/api) and [Anthropic](https://console.anthropic.com/).

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Add your API keys to .env
node server.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

## How it works

The app makes two API calls when you request recommendations:

1. **TMDB search** - Gets full metadata (plot, ratings, genres) for your selected films
2. **Claude AI** - Analyzes the films and returns 5 recommendations with reasoning

I use TMDB's rich metadata instead of just film titles because it gives Claude much better context for understanding what you actually liked.

The exclude list works by sending your "already watched" films to Claude, which avoids recommending them.

## Project structure

```
film-sommelier/
├── backend/
│   ├── server.js              # Express API
│   ├── tmdbService.js         # TMDB integration
│   └── claudeService.js       # Claude integration
└── frontend/
    └── src/
        └── App.tsx            # Main React component
```

## Why I built it this way

**Multiple films instead of one**: Helps find patterns across films you like, not just "similar to X"

**Separate backend**: Keeps API keys secure, makes it easier to add a database later

**Claude instead of a recommendation algorithm**: Gets actual reasoning for each suggestion, handles nuance better than collaborative filtering

**TMDB for everything film-related**: Free tier is generous, posters are high quality, data is comprehensive

## What I learned

- Async/await patterns and error handling
- Building a REST API with Express
- React state management and component patterns
- Working with external APIs (TMDB, Claude)
- TypeScript for type safety
- Tailwind for rapid UI development

## Possible improvements

- User accounts with JWT auth
- MongoDB for persistent watched films
- Better poster matching for international films
- Streaming availability (JustWatch API)
- Filters by decade, country, genre

## Running tests

```bash
cd backend
node testTMDB.js      # Test TMDB integration
node testClaude.js    # Test full recommendation flow
node testAPI.js       # Test API endpoints
```

---

Built by Abbas Zain Ul Abidin as a portfolio project for graduate software developer roles.

• [LinkedIn](https://www.linkedin.com/in/abbas-zain/)
