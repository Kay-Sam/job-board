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

Vite serves the app at `http://localhost:5173`; this origin is allowed by the backend CORS configuration.

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
