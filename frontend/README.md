# Film Sommelier - Frontend

A beautiful React + TypeScript frontend for getting AI-powered film recommendations.

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **ESLint** - Code quality

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to the URL shown (typically `http://localhost:5173`)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── FilmInput.tsx           # Input for adding films
│   │   ├── PreferencesInput.tsx    # Textarea for preferences
│   │   └── RecommendationCard.tsx  # Display recommendation
│   ├── services/
│   │   └── api.ts                  # Backend API calls
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Tailwind imports
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Features

- Add multiple films you enjoyed
- Describe your film preferences
- Get AI-powered recommendations from Claude
- Beautiful gradient UI with smooth animations
- Fully typed with TypeScript
- Responsive design

## Backend Requirement

Make sure the backend server is running on `http://localhost:3000`:

```bash
cd ../backend
node server.js
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.
