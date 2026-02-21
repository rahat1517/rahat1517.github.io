# NewsPortal (Full Stack) — Assignment Submission

## Tech Stack
- Backend: Node.js, Express, Sequelize ORM, PostgreSQL, JWT Auth, Joi Validation
- Frontend: React (Vite), React Router, Axios

## Backend Requirements Covered
✅ Token-based auth (JWT)
✅ ORM (Sequelize)
✅ Migrations (sequelize-cli)
✅ Seeders (sequelize-cli)
✅ .env usage (dotenv)
✅ RESTful API design
✅ Request validation (Joi)
✅ Separation of concerns (routes → controllers → services → repositories)
✅ Error handling middleware

---

# 1) Project Structure
newsportal/
  backend/
  frontend/

---

# 2) Backend Setup

## 2.1 Prerequisites
- Node.js (LTS recommended)
- PostgreSQL running locally

## 2.2 Configure Environment
Inside backend/:
cp .env.example .env

Edit .env with your DB credentials if needed.

## 2.3 Create Database
Create a PostgreSQL database named: newsportal

## 2.4 Install & Run
cd backend
npm install
npm run db:migrate
npm run db:seed
npm run dev

Backend: http://localhost:5000
Health:  GET http://localhost:5000/health

## 2.5 Seeded Users
- Admin: admin@newsportal.com / Admin@123
- User:  user@newsportal.com / User@123

---

# 3) Frontend Setup

Inside frontend/:
cp .env.example .env

Install & run:
cd frontend
npm install
npm run dev

Frontend: http://localhost:5173

---

# 4) API Endpoints (Summary)

Base: http://localhost:5000/api

Auth:
- POST /auth/register
- POST /auth/login

Categories:
- GET /categories (public)
- POST /categories (ADMIN only)

Articles:
- GET /articles?categoryId=&q= (public)
- GET /articles/:slug (public)
- POST /articles (auth)
- PATCH /articles/:id (auth; ADMIN or owner)
- DELETE /articles/:id (auth; ADMIN or owner)
