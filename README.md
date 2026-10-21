# Sharing Vision

A simple **Go** backend with a **Vue 3** (Vite) frontend for managing posts.

---

## 📦 Prerequisites

- **Docker Desktop** (or Docker Engine) – for the MySQL database and the Go backend container.
- **Node.js** (v20+) – to run the frontend development server.
- **Git** – to clone the repository.

---

## 🚀 Quick start

```bash
# 1️⃣ Clone the repository (replace <repository-url> with the actual URL)
git clone <repository-url> sharing-vision
cd sharing-vision
```

### Backend (Docker Compose)

```bash
# Copy the env template and set your own values (keep `change_me` as placeholder if you don't want real passwords)
cp Backend/.env.example Backend/.env
# Edit Backend/.env if you wish – make sure DB credentials match the compose file.

# Start the containers (MySQL + Go API)
cd Backend
docker compose up -d --build
```

The backend API will be reachable at `http://localhost:8080`.

### Frontend

```bash
# Install dependencies
cd ../Frontend
npm install

# Copy the env template – this sets the API base URL for the dev server.
cp .env.example .env   # .env will contain VITE_API_BASE_URL=http://localhost:8080

# Start the dev server (default port 3000, will fall back to 3001 if 3000 is busy)
npm run dev
```

Open your browser at the printed URL (e.g., `http://localhost:3001`). You should see the **All Posts** page with three tabs:
- **Published** – only posts with `status: "publish"`
- **Drafts** – posts with `status: "draft"`
- **Trash** – posts with `status: "trash"`

---




