# Mini Job Board

A small full-stack job listing application. Users can browse, search, filter, create, edit, and delete jobs.

## Stack

- Python, Django, Django REST Framework, SQLite, django-cors-headers
- React, Vite, React Router, Axios, plain CSS

## Backend setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_jobs
python manage.py runserver
```

The API runs at `http://127.0.0.1:8000/api/jobs/`. The seed command is idempotent.

## Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

Vite serves the app at `http://localhost:5173`; in development the frontend uses the local Django API at `http://127.0.0.1:8000/api`.

For local configuration, copy `backend/.env.example` to `backend/.env` and `frontend/.env.example` to `frontend/.env.local`. These local env files are gitignored. The frontend API URL is configuration, not a secret; never put private keys or database credentials in a `VITE_*` variable because those values are exposed in the browser bundle.

## Deployment

The frontend uses localhost in development. For production, set `VITE_API_BASE_URL` in the Vercel project’s Environment Variables to the deployed API base URL, then redeploy. Production configuration belongs in the hosting provider’s environment settings; do not commit `.env` files or secrets.

For the Render backend, use `backend` as the service root directory, install with `pip install -r requirements.txt`, and start with `python -m gunicorn config.wsgi:application`. Configure these Render environment variables:

- `DEBUG=False`
- `SECRET_KEY` to a newly generated private value
- `DATABASE_URL` to the PostgreSQL connection URL (for example, Neon)
- `CORS_ALLOWED_ORIGINS=https://minijobboard.vercel.app`

Run `python manage.py migrate` against the production database before first use. To populate the sample listings once, run `python manage.py seed_jobs` from the Render shell after migrations. Do not commit secrets or production database URLs.

## API

- `GET`, `POST` `/api/jobs/`
- `GET`, `PUT`, `PATCH`, `DELETE` `/api/jobs/<id>/`
- `GET /api/jobs/?search=django` searches title, company, and location.
- `GET /api/jobs/?job_type=full_time` filters by type.
- `GET /api/jobs/?is_active=true` filters active jobs. Jobs are active-only by default.

Valid job types are `full_time`, `part_time`, `contract`, `internship`, and `remote`. Salary is optional and cannot be negative.

## Testing and checks

```bash
cd backend
python manage.py check
python manage.py test
cd ../frontend
npm run build
```
