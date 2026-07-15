# NEXA AI

A Gemini-style AI chat interface built with React and Vite, powered by Groq's ultra-fast inference API running Llama 3.3 70B.

**Live demo:** [nexa-ai-taupe.vercel.app](https://nexa-ai-taupe.vercel.app)

## Features

- Clean, familiar chat UI with a collapsible sidebar (new chat, history, recent prompts)
- Real-time responses from Groq's OpenAI-compatible chat completions endpoint
- Suggested prompt cards for quick starts (code, ideas, research, etc.)
- Context-based state management for chat history and UI state
- Responsive layout for desktop and mobile

## Tech Stack

- **Frontend:** React 18, Vite 5
- **Styling:** CSS
- **AI Provider:** [Groq](https://console.groq.com) (`llama-3.3-70b-versatile`)
- **Linting:** ESLint
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js >= 18
- A free Groq API key from [console.groq.com/keys](https://console.groq.com/keys) (no billing/card required)

### Installation

```bash
git clone https://github.com/shivam-0007/NEXA-AI.git
cd NEXA-AI
npm install
```

### Configuration

Create a `.env` file in the project root (same level as `package.json`):

```env
VITE_GROQ_API_KEY=your_key_here
```

### Run locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other scripts

```bash
npm run build     # Production build
npm run preview   # Preview the production build locally
npm run lint       # Run ESLint
```

## Project Structure

```
NEXA-AI/
├── src/
│   ├── assets/            # Icons and images
│   ├── components/
│   │   ├── main/           # Main chat window
│   │   └── sidebar/         # Sidebar navigation
│   ├── config/
│   │   └── Gemini.js       # Groq API integration
│   ├── context/
│   │   └── Context.jsx      # Global chat state
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```


