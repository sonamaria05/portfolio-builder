# Portfolio Builder

A React + Material UI portfolio builder with a local Node backend for auth, saving portfolios, publishing shareable links, and downloading previews as PDFs.

## Features

- Signup and login with token-based authentication.
- Portfolio builder for profile, skills, projects, experience, and education.
- Multiple templates, font choices, and light/dark portfolio themes.
- Save and reload your portfolio from the backend.
- Publish a shareable route like `/portfolio/your-name-abc123`.
- Download the preview as a PDF.

## Run Locally

Install dependencies:

```bash
npm install
```

Start the backend API:

```bash
npm run server
```

In another terminal, start the React app:

```bash
npm start
```

The frontend runs at `http://localhost:3000`.
The backend runs at `http://localhost:5000`.

## Backend Data

The backend stores local development data in `server/data/db.json`. That folder is ignored by Git.

## API Routes

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/portfolios/me`
- `POST /api/portfolios/save`
- `POST /api/portfolios/publish`
- `GET /api/portfolios/public/:slug`

## Environment

The frontend uses `http://localhost:5000/api` by default. To point it elsewhere, set:

```bash
REACT_APP_API_URL=https://your-api.example.com/api
```

The backend accepts these optional variables:

```bash
PORT=5000
CLIENT_ORIGIN=http://localhost:3000
JWT_SECRET=replace-this-in-production
```
