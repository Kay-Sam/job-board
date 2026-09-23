# Mini Job Board — Implementation Process

## Project setup

The backend uses Django, Django REST Framework (DRF), SQLite, and `django-cors-headers`. The frontend uses React, Vite, React Router, Axios, and plain CSS. Dependencies were installed from `backend/requirements.txt` and `frontend/package.json`.

## Django structure and model

`backend/manage.py` is Django's command entry point. The `config` package holds settings, URL configuration, and ASGI/WSGI application setup; `jobs` is the focused application containing job-board behavior.

`Job` has required `title`, `company`, `location`, and `description` fields, a choice-based `job_type`, optional non-negative decimal `salary`, `is_active`, and automatically created `created_at`. Choices prevent unsupported job types; `DecimalField` stores currency-like values accurately. Migration `jobs.0001_initial` creates the corresponding SQLite table, and Django's ORM represents its rows as `Job` objects.

## DRF API, validation, and filters

`JobSerializer` converts `Job` instances to JSON and validates incoming JSON. DRF supplies normal required-field and choice errors; serializer/model validation rejects negative salaries. `JobViewSet` plus a router exposes:

* `GET`, `POST /api/jobs/`
* `GET`, `PUT`, `PATCH`, `DELETE /api/jobs/<id>/`

The list endpoint uses DRF's `SearchFilter` for `?search=` across title, company, and location. It also uses ORM filtering for `?job_type=` and `?is_active=`. By default it lists only active jobs; individual records remain retrievable so inactive listings can still be managed.

## Admin and seed data

`JobAdmin` lists title, company, location, type, active status, and creation date, with filters and search. `python manage.py seed_jobs` calls `get_or_create` for five examples, so repeat runs do not duplicate them.

## Backend tests

The DRF test suite exercises job creation, listing, retrieval, partial update, deletion, invalid job type, and negative salary. These verify response status codes and persisted model behavior.

## React interface and integration

`api.js` centralizes Axios calls to `http://127.0.0.1:8000/api`. React Router redirects `/` to `/jobs` and defines list, create, detail, and edit routes. The list page requests filtered server data, debouncing search input briefly; it displays loading, error, and empty states. `JobCard` is reusable for each listing.

The shared controlled `JobForm` supports create and edit, sends POST or PUT calls, converts blank salary to `null`, and shows field errors returned by DRF. The details page fetches one record, displays its fields, offers edit/back controls, and confirms before DELETE before navigating to the list. Django CORS allows the Vite development origin `http://localhost:5173`.

## Verification performed

```text
python manage.py migrate
Result: PASS

python manage.py check
Result: PASS — no issues

python manage.py test
Result: PASS — 7 tests

python manage.py seed_jobs
Result: PASS — five example records created

npm run build
Result: PASS — Vite production build completed
```

## Main concepts demonstrated

The implementation demonstrates the difference between a Django project and application, models and migrations, ORM queries, serializers, view sets and routers, REST CRUD, validation, management commands, automated API testing, React components and local state, client-side routing, Axios requests, and CORS for local frontend/backend communication.
