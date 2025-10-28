# Prima Lingua

> A language learning application focused on mastering the essential ~1000 words in any language through interactive flashcards and gamified learning.

[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

---

## 📚 About Prima Lingua

Prima Lingua is a vocabulary-focused language learning application built around the concept that learning the first ~650-1000 words in a language provides a strong foundation for fluency. 
### Key Features

- **Bilingual Flashcard System** - Select your source language (known) and target language (learning)
- **Categorized Vocabulary** - Words organized into intuitive categories
- **Interactive Learning** - Flip-card interface for active recall practice
- **Progress Tracking** - Monitor your learning journey and achievements _(in development)_
- **Word Classes** - Vocabulary tagged by grammatical class (verb, noun, adjective, etc.)
---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- Access to the [Prima Lingua backend API](http://prima-lingua-api.onrender.com/api/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd prima-lingua-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   # Local development
   VITE_API_URL=http://localhost:3000/api
   
   # Production
   # VITE_API_URL=http://prima-lingua-api.onrender.com/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized production build will be output to the `dist/` directory.

---

## 🏗️ Project Architecture

### Tech Stack

- **React 18+** - UI library
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API requests
- **React Context API** - State management

---

## 🤝 Related Repositories

- **Backend API**: [prima-lingua-backend](https://github.com/hejfridafrej/prima-lingua-BE)
- **Database**: MongoDB Atlas

## 🗺️ Roadmap

### Current Phase
- [x] Basic flashcard display
- [x] Language selection
- [x] Vocabulary fetching by language pair

### Planned Features
- [ ] Category-based color coding
- [ ] Gamification elements (streaks, achievements)
- [ ] User authentication
- [ ] Custom deck creation
- [ ] Progress tracking and statistics
- [ ] Mobile app version
