# Mini Job Board — Progress

## Project Status

Complete. The project provides a Django REST Framework API backed by SQLite and a React/Vite interface that uses that API for job CRUD, searching, and filtering.

## Backend

* [x] Django `config` project and `jobs` application
* [x] Django REST Framework and CORS configuration
* [x] `Job` model, migration, serializer, CRUD view set, and router
* [x] Search (title, company, location), type filter, and active filter
* [x] Required-field, job-type, and non-negative-salary validation
* [x] Useful Django admin registration
* [x] Idempotent `seed_jobs` management command
* [x] API tests: create, list, retrieve, update, delete, invalid type, negative salary

## Frontend

* [x] Vite, React Router, and Axios configuration
* [x] Jobs list, reusable cards, details, create, and edit routes
* [x] API-backed search and job-type filtering
* [x] Delete confirmation and redirect
* [x] Loading, API-error, validation-error, and empty states
* [x] Responsive plain-CSS styling

## Integration

* [x] Frontend uses the Django API as its only job-data source
* [x] REST endpoints support GET, POST, PUT, PATCH, and DELETE
* [x] CORS permits `http://localhost:5173`

## Verification

* [x] `python manage.py migrate` — passed
* [x] `python manage.py check` — passed, no issues
* [x] `python manage.py test` — passed, 7 tests
* [x] `python manage.py seed_jobs` — passed, five seed records created
* [x] `npm run build` — passed

## Documentation

* [x] README setup, endpoints, seed, and testing instructions
* [x] Implementation process documented in `PROCESS.MD`

## Remaining Issues

None known.
