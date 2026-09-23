# Mini Job Board — Product Requirements Document

## 1. Product Overview
Mini Job Board is a small full-stack job listing application. Users can view, search, filter, create, edit, and delete job listings.

## 2. Technology Stack
- Backend: Python, Django, Django REST Framework, SQLite, Django ORM
- Frontend: React, Vite, React Router, Axios, plain CSS

## 3. MVP Scope
A Job contains:
- id
- title
- company
- location
- job_type
- description
- salary
- is_active
- created_at

Supported job types:
- full_time
- part_time
- contract
- internship
- remote

## 4. Backend Requirements
Create a Django project named `config` and app named `jobs`.
Use SQLite and Django REST Framework.

Implement the Job model with:
- title: required CharField, max 200
- company: required CharField, max 200
- location: required CharField, max 200
- job_type: required choice field
- description: required TextField
- salary: optional DecimalField
- is_active: BooleanField default True
- created_at: auto-created DateTimeField

## 5. API Requirements
Base path: `/api/jobs/`

Support:
- GET /api/jobs/
- GET /api/jobs/<id>/
- POST /api/jobs/
- PUT /api/jobs/<id>/
- PATCH /api/jobs/<id>/
- DELETE /api/jobs/<id>/

Support query parameters:
- `?search=` against title, company, location
- `?job_type=`
- `?is_active=`

Validation:
- required fields
- valid job type
- salary cannot be negative

## 6. Django Admin
Register Job in admin with useful list display fields.

## 7. Frontend Requirements
Use React, Vite, React Router, Axios, and plain CSS.
No mock job data.

Routes:
- `/` redirects to `/jobs`
- `/jobs`
- `/jobs/new`
- `/jobs/:id`
- `/jobs/:id/edit`

Jobs page:
- search
- job type filter
- job cards
- create button
- loading/error/empty states

Details page:
- job information
- edit
- delete with confirmation
- back navigation

Create/edit:
- title
- company
- location
- job type
- description
- salary
- active status
- API validation errors

## 8. Seed Data
Create `python manage.py seed_jobs` with:
- Django Backend Developer
- React Frontend Developer
- Junior Full Stack Developer
- UI/UX Design Intern
- Python Developer

Do not duplicate records when rerun.

## 9. CORS
Allow the Vite development frontend at `http://localhost:5173`.

## 10. Testing
Backend tests must cover:
- creation
- listing
- retrieval
- update
- deletion
- invalid job type
- negative salary

Verify the frontend builds successfully.

## 11. Non-Goals
Do not implement authentication, applications, payments, file uploads, PostgreSQL, Docker, Redis, Celery, deployment, advanced permissions, or unnecessary state-management/UI frameworks.

## 12. Definition of Done
The complete Django API and React frontend work together locally, CRUD works, search/filtering works, validation works, admin works, seed data works, backend tests pass, frontend build succeeds, and README documentation is included.
