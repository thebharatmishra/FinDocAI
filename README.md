# FinDocAI — AI-Powered Financial Document Analyzer (Scaffold)

This repository contains a minimal full-stack scaffold for an AI-powered financial document analyzer. It provides:

- Backend (Node.js + Express + TypeScript) with a secure file upload endpoint, PDF parsing, and an AI integration module (OpenAI or mock)
- Frontend (React + TypeScript + Vite) with Tailwind CSS, a drag-and-drop upload UI, and a results panel that shows structured data

This is a scaffold to demonstrate end-to-end flow; replace the mock AI or provide an API key to call OpenAI.

## Quick start (Windows, bash)

1. Open two terminals.

2. Backend:

```bash
cd backend
npm install
# create a .env file with OPENAI_API_KEY if you want real AI calls
npm run dev
```

3. Frontend:

```bash
cd frontend
npm install
npm run dev
```

4. Open the frontend URL printed by Vite (usually http://localhost:5173) and upload a PDF.

## Notes

- The backend will use a mock AI extractor if `OPENAI_API_KEY` is not set. When set, it will attempt to call the OpenAI API (you must provide a key).
- This scaffold favors clarity and quick iteration. For production, harden CORS, auth, rate-limiting, file storage, and secrets handling.
