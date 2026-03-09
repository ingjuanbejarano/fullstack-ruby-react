# PITZ Inventory Challenge

A full-stack product management application built with **Ruby on Rails** (Backend) and **React** (Frontend).

## Getting Started

### Prerequisites

| Tool | Version |
| :--- | :--- |
| **Ruby** | ^3.2 |
| **Rails** | ^7.1 |
| **Node.js** | ^20.x |
| **PostgreSQL** | ^14+ |
| **pnpm** | Recommended |

---

## Backend Setup (Rails)

1. **Navigate to backend:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   bundle install
   ```

3. **Setup Database:**
   ```bash
   bin/rails db:create db:migrate db:seed
   ```

4. **Run Tests:**
   ```bash
   bundle exec rspec
   ```

5. **Start Server:**
   ```bash
   bin/rails server -p 3000
   ```

---

## Frontend Setup (React + Vite)

1. **Navigate to frontend:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   pnpm install # or npm install
   ```

3. **Run Tests:**
   ```bash
   pnpm test:run
   ```

4. **Start Development Server:**
   ```bash
   pnpm dev
   ```

---

## ✨ Features Key

* **Clean Architecture:** Domain logic encapsulated in Rails Service Objects.
* **Robust Validations:** Real-time frontend validation and strict backend database constraints.
* **Premium UX:** Tailwind CSS v4 design with Dark Mode support and Skeleton Loaders.
* **Search & Filters:** Real-time debounced search and status filtering.
* **Error Management:** Global Rails error handler mapping to standardized JSON.
