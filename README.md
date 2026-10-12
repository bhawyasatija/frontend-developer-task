# TaskFlow

A full-stack task-management web app (MERN-style): a React single-page client with a dark/light theme and animated UI, backed by an Express + MongoDB REST API with JWT authentication. It was built as a frontend-developer assignment ("scalable web app with auth and dashboard").

> **Status:** a complete-looking small project, but it has not been run or tested as part of this write-up. Everything below describes what the source implements. There are no automated tests.

## Overview

Users register and log in, then manage personal tasks on a dashboard: create tasks, set priority, change status, delete them, and search or filter the list. A profile/settings area lets them update their details and password.

## Features (as present in the source)

- **Authentication:** register, login and "current user" endpoints; passwords hashed with bcrypt (cost 12); JWT bearer tokens (default expiry 7 days); protected client routes and a `protect` middleware on the API.
- **Tasks:** CRUD scoped to the logged-in user. Task fields: title (max 100), description (max 500), status (`pending`, `in-progress`, `completed`), priority (`low`, `medium`, `high`), due date, tags. The list endpoint supports `status`/`priority` filters, pagination (`page`, `limit`) and returns per-status counts via a MongoDB aggregation.
- **Profile:** get/update profile and change password (verifies the current password).
- **Validation and errors:** `express-validator` rules via a shared `validateRequest` middleware, and a centralised error handler.
- **Frontend:** dashboard with animated stat counters, search box and status/priority filters, a modal for creating tasks, skeleton loaders, toast notifications, theme toggle persisted in `localStorage`, and Privacy, Terms, Contact and Settings pages.

## Architecture

```
client/   React 19 + Vite 7 + Tailwind CSS 4
          context/ (Auth, Theme), services/api.js (Axios + interceptors), pages/, components/{ui,layout,animations}
server/   Express 4 (ES modules)
          routes -> validation middleware -> controllers -> Mongoose models (User, Task)
```

- The client calls `/api/*`. In development, Vite proxies `/api` to `http://localhost:5001`.
- An Axios request interceptor attaches the JWT from `localStorage`; the response interceptor clears the token and redirects to `/login` on a 401.
- Task listing on the dashboard fetches the user's tasks and applies search/status/priority filtering **on the client** (the API's server-side filtering and pagination exist but the dashboard does not use them).
- `Task` has a compound index on `{ user, createdAt }`.

## Tech stack

- **Frontend:** React 19, React Router 7, Vite, Tailwind CSS 4, Framer Motion, Lucide icons, React Hot Toast, Axios
- **Backend:** Node.js, Express, Mongoose (MongoDB), `jsonwebtoken`, `bcryptjs`, `express-validator`, `cors`, `dotenv`
- **Tooling:** ESLint; a Postman collection (`TaskFlow.postman_collection.json`) for the API

`swiper`, `bootstrap` and `react-bootstrap` are listed as client dependencies but are not used by the components.

## API

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | no | Create account |
| POST | `/api/auth/login` | no | Log in, returns JWT |
| GET | `/api/auth/me` | yes | Current user |
| GET / PUT | `/api/user/profile` | yes | Read / update profile |
| PUT | `/api/user/password` | yes | Change password |
| GET / POST | `/api/tasks` | yes | List (filter, paginate) / create |
| GET / PUT / DELETE | `/api/tasks/:id` | yes | Read / update / delete one task |
| GET | `/api/health` | no | Health check |

## Requirements

- Node.js 18+
- A MongoDB instance (local or Atlas)

## Setup and run

```bash
cd server && npm install
cp .env.example .env     # then edit the values
npm run dev              # API on the PORT from .env

cd ../client && npm install
npm run dev              # http://localhost:5173
```

### Environment variables (`server/.env`)

| Variable | Purpose |
| --- | --- |
| `PORT` | API port. The Vite proxy in `client/vite.config.js` expects `5001` |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign tokens. Use your own long random value |
| `JWT_EXPIRE` | Token lifetime (default `7d`) |
| `NODE_ENV` | `development` enables request logging |
| `CLIENT_URL` | Allowed CORS origin (default `http://localhost:5173`) |

## Known limitations

- No automated tests.
- Dashboard filtering is client-side only; server pagination is not wired into the UI.
- No refresh-token flow and no rate limiting.
- Unused client dependencies (`swiper`, `bootstrap`, `react-bootstrap`).
- No `LICENSE` file is included, so usage rights are unspecified.
- Git history note: an early commit included `node_modules`, and an earlier version of `server/.env` (local development values) was committed. `.env` is now untracked and ignored. If you ever reused those values elsewhere, rotate them.
