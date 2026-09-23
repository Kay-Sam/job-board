# Mini Job Board — Development Plan

There is one phase: implement the complete MVP in one continuous task.

The coding agent must read:
- PRD.md
- ARCHITECTURE.md
- DEVELOPMENT.md
- PROGRESS.md

Then implement the entire backend and frontend, run validation, fix issues, update PROGRESS.md, and provide a final summary.

## Backend
Implement Django, DRF, SQLite, Job model, migrations, serializer, CRUD API, search, filtering, validation, admin, seed command, tests, and CORS.

## Frontend
Implement Vite React app, React Router, Axios, Jobs page, details page, create/edit form, delete flow, search, filtering, loading/error/empty states, and responsive CSS.

## Verification
Run:
```bash
python manage.py check
python manage.py test
```
and:
```bash
npm run build
```

Do not claim a check passed unless it was actually run.

Create/update README.md with setup and API instructions.
