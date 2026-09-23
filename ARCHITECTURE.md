# Mini Job Board — Architecture

## Overview
React + Vite communicates with Django REST Framework over HTTP/JSON. Django uses the ORM and SQLite.

```text
React + Vite
     |
     | HTTP / JSON
     v
Django REST Framework
     |
     v
Django ORM
     |
     v
SQLite
```

## Backend
```text
backend/
├── manage.py
├── requirements.txt
├── config/
└── jobs/
```

Use conventional Django/DRF patterns. A `ModelViewSet` and router are preferred for CRUD unless there is a clear reason otherwise.

## Frontend
```text
frontend/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── api.js
    ├── index.css
    ├── components/
    └── pages/
```

Use React local state. Do not introduce global state management.

## Routes
- `/` -> redirect to `/jobs`
- `/jobs`
- `/jobs/new`
- `/jobs/:id`
- `/jobs/:id/edit`

The frontend must use the real API as its only job-data source.
