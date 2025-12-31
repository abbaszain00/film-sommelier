# Film Sommelier

A film recommendation system powered by TMDB and Claude AI.

## Project Structure

```
film-sommelier/
├── backend/           # Backend API and services
│   ├── server.js      # Express API server
│   ├── tmdbService.js # TMDB API integration
│   ├── claudeService.js # Claude AI integration
│   ├── testTMDB.js    # TMDB service tests
│   ├── testClaude.js  # Claude service tests
│   ├── testAPI.js     # API endpoint tests
│   ├── .env           # Environment variables (not in git)
│   └── package.json   # Backend dependencies
│
└── frontend/          # React + TypeScript frontend
    ├── src/
    │   ├── components/   # React components
    │   ├── services/     # API integration
    │   └── types/        # TypeScript interfaces
    └── package.json      # Frontend dependencies
```

## Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your API keys:
   ```
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. Run the server:
   ```bash
   node server.js
   ```

## API Endpoints

- `POST /api/recommendations` - Get film recommendations
  - Body: `{ "likedFilms": [...], "preferences": "...", "excludedFilms": [...] }`

## Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

## Testing

Run tests from the backend folder:
```bash
cd backend
node testTMDB.js      # Test TMDB API
node testClaude.js    # Test Claude AI integration
node testAPI.js       # Test full API flow
```

## Usage

1. Start the backend server:
   ```bash
   cd backend
   node server.js
   ```

2. Start the frontend (in a separate terminal):
   ```bash
   cd frontend
   npm run dev
   ```

3. Visit `http://localhost:5173` in your browser and start getting film recommendations!
