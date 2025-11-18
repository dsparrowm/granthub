# Granthub - Server

This folder contains a minimal Node/Express scaffold and a SQL migration to run locally.

Quick start

1. Install dependencies

```bash
cd server
npm install
```

2. Configure environment variables

Copy `.env.example` to `.env` and set `DATABASE_URL` (Postgres connection string).

3. Initialize database

```bash
# from repository root, or cd server
pSQL_URL="your connection string"
# using psql
psql "$DATABASE_URL" -f migrations/001_init.sql
```

4. Run server

```bash
npm run dev
# or
npm start
```

API endpoints

- GET /api/grants
- GET /api/grants/:id
- POST /api/grants/:id/apply  (JSON body: { applicant_name, email, amount_requested, attachments? })

Notes

- This is a lightweight scaffold for local development and testing. For production use you'll want to add:
  - Validation, authentication and authorization
  - Rate limiting and input sanitization
  - File upload handling (S3 / Supabase Storage)
  - Migrations tooling (e.g. sqitch, prisma, knex)
