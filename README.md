# Frontend - Sharing Vision

A **Vue 3** (Vite) frontend for the Sharing Vision project.

---

## 📦 Prerequisites

- **Node.js** (v20+) – to run the development server.
- **Git** – to clone the repository (if you haven't already).

---

## 🚀 Quick start (frontend only)

```bash
git clone https://github.com/fahmiarya/Article-Frontend.git
cd Article-Frontend
```

### Install dependencies

```bash
npm install
```

### Environment configuration

```bash
# Salin file env contoh – file ini mengatur base URL API untuk development server.
cp .env.example .env   # .env akan berisi VITE_API_BASE_URL=http://localhost:8080
```

> **Note:** Backend API harus berjalan di http://localhost:8080 (Docker Compose di folder Backend). Sesuaikan URL di .env jika menggunakan host atau port yang berbeda.

### Run the dev server

```bash
npm run dev
```

Server akan mencoba berjalan di port 3000; jika port tersebut sudah digunakan, Vite akan otomatis beralih ke port kosong berikutnya (misalnya, http://localhost:3001). Buka URL yang ditampilkan di terminal.
