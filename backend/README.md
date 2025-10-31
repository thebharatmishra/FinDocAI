# Backend — FinDocAI

This is a small Express + TypeScript backend scaffold that accepts PDF uploads, parses them to text, and calls an AI service to extract structured financial data.

Quick start:

1. cd backend
2. npm install
3. Create a `.env` in the backend folder with optionally:

```
OPENAI_API_KEY=sk-...
PORT=4000
```

4. npm run dev

Notes:

- For now the AI service returns a deterministic mock if `OPENAI_API_KEY` is not set.
- File upload limit is 10 MB. Only PDF MIME type is allowed.
