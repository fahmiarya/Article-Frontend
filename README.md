# Frontend - Sharing Vision

A **Vue 3** (Vite) frontend for the Sharing Vision project.

---

## 📦 Prerequisites

- **Node.js** (v20+) – to run the development server.
- **Git** – to clone the repository (if you haven't already).

---

## 🚀 Quick start (frontend only)

```bash
# 1️⃣ Clone the repository (replace <repository-url> with the actual URL) if you haven't yet
git clone https://github.com/fahmiarya/Article-Frontend.git
```

### Install dependencies

```bash
npm install
```

### Environment configuration

```bash
# Copy the example env file – it sets the API base URL for the dev server.
cp .env.example .env   # .env will contain VITE_API_BASE_URL=http://localhost:8080
```

> **Note:** The backend API should be running at `http://localhost:8080` (Docker Compose in the Backend folder). Adjust the URL in `.env` if you use a different host or port.

### Run the dev server

```bash
npm run dev
```

The server will try to start on port **3000**; if it is already in use, Vite will automatically switch to the next free port (e.g., `http://localhost:3001`). Open the printed URL in your browser.

---

## 🛠️ Development notes

- The default view is the **Published** tab and shows only posts with `status: "publish"` on first load.
- The **Trash** tab no longer shows a "Trash" button for posts that are already in the trash.
- Vite alias `@` points to the `src` directory (configured in `vite.config.ts`).

---

## 📄 Environment file

- `Frontend/.env.example` – contains `VITE_API_BASE_URL`. Copy it to `.env` before starting the dev server.

---
