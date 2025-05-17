# Ordering Website

A single-page ordering website built with Next.js, Node.js (TypeScript), MongoDB.

## 🛠 Tech Stack

- Frontend: Next.js
- Backend: Express + TypeScript
- Database: MongoDB
- Styling: CSS Modules

## 📦 Features

- Item listing from JSON data
- Search by SKU or title
- Add/remove items from cart
- Chat interface for querying items (e.g. "Show items under $50")
- Pagination

## ⚙️ Setup

### Backend:

```bash
cd backend
npm install
npm run build
npm start
```

### Frontend:

```bash
cd frontend
npm install
npm run dev
```

### Set .env:

```bash
MONGO_URI=your-mongodb-uri
PORT=5000
```

### SEED DB:

```bash
npm run seed
```
